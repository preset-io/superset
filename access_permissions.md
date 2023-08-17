# Entity and Data Access Permissions in Superset

## Overview

The goal of this document is to define the expected behaviors of Superset's access control system, and how behaviors may differ when certain feature flags are enabled/disabled.

In Superset, the logic for determining whether a user has access to an entity is often duplicated between a security manager method (usually `raise_for_access`) and a subclass of FAB's `BaseFilter` which applies filters to a query.  Both API and DAO classes use the `BaseFilter`'s to determine which objects a user can access.  However, there are several instances where there are discrepancies between the logic the security manager uses and the logic the `BaseFilter` uses.


## Superset with out of the box defaults

This section is broken into subsections for each Superset entity type. Each subsection aims to answer the following questions:
1. What does it mean to have access to an instance of this entity?
2. Which classes/functions are responsible for determining whether a user has access to an instance of this entity?
3. What is the current logic defined in each of these classes/functions?
4. Are there any discrepancies between the logic defined in these classes/functions?
5. What is the expected behavior we want consolidate on and enforce going forward?

### Databases

Having access to a database implies that you can do the following:
* View the database's metadata
* View all of the database's tables and schemas
* Access any of the database's datasources
* Query any of the database's tables in sqllab
* Edit the database's metadata (if the user has the global edit database perm)
* Delete the database (if the user has the global edit database perm)

Databases do not have owners

Classes/functions currently responsible for enforcing whether a user has access to a database:
* `security_manager.can_access_database`
* `superset.databases.filters.DatabaseFilter`

According to `security_manager.can_access_database`, a user can access a database if and only if one of the following is true:
* The user has the `all_datasource_access` permission
* The user has the `all_database_access` permission
* The user has the `database_access` permission for the database

The logic in `DatabaseFilter` differs in the following ways:
* Does not check `all_datasource_access`
* Grants access if the user has access to at least one schema belonging to the database
* Grants access if the user has the `datasource_access` permission for at least one datasource belonging to the database

The expected behavior we want going forward is that a user can access a database if and only if one of the following is true:
* The user has the `all_database_access` permission
* The user has the `database_access` permission for the database
* The user has the `all_datasource_access` permission ??


### Datasources

Having access to a datasource implies that you can do the following:
* View the datasource's metadata
* Retrieve data from the datasource
* Create charts powered by the datasource (if the user has the global create chart perm)
* Have access to any charts powered by the datasource

Having ownership of a datasource implies that you can do the following:
* Edit the datasource's metadata, including adding or removing other owners (if the user has the global edit dataset perm)
* Delete the datasource (if the user has the global delete dataset perm)

Classes/functions currently responsible for enforcing whether a user has access to a datasource:
* `security_manager.raise_for_access`
* `DatasourceFilter`

According to `security_manager.raise_for_access`, a user can access a datasource if and only if one of the following is true:
* The user has the `all_datasource_access` permission
* The user is an owner of the datasource
* The user has access to the database the datasource belongs to
* The user has access to the schema the datasource belongs to
* The user has the `datasource_access` permission for the datasource

The logic in `DatasourceFilter` differs in the following way:
* Does not check ownership status

The expected behavior we want going forward is the current behavior of `security_manager.raise_for_access`


### Charts

Having access to a chart implies that you can do the following:
* View its metadata
* See the data returned from the underlying query
* Favorite the chart

Having ownership of a chart implies that you can do the following:
* Edit the chart's metadata, including adding or removing other owners (if the user has the global edit chart perm)
* Delete the chart (if the user has the global delete chart perm)

Classes/functions currently responsible for enforcing whether a user has access to a chart:
* `security_manager.raise_for_access` (query context/viz containing chart's underlying datasource is passed)
* `ChartFilter`

A user can access a chart if and only if:
* The user can access the chart's underlying datasource

Note that ownership is not considered for chart access.


### Dashboards
Having access to a dashboard implies that you can do the following:
* View its metadata
* Render the dashboard's layout
* Favorite the dashboard
* View limited metadata of any charts on the dashboard, only what is required to render the charts
* View limited metadata of the datasets powering the charts on the dashboard, only what is required to render the charts

Note that viewing the data returned from the queries powering each chart is not included, datasource access is needed for that. Charts that the user does not have access to display an error

Having ownership of a dashboard implies that you can do the following:
* Edit the dashboard's metadata, including adding or removing owners (if the user has the global edit dashboard perm)
* Delete the dashboard (if the user has the global delete dashboard perm)

Classes/functions currently responsible for enforcing whether a user has access to a dashboard:
* `security_manager.raise_for_access`
* `DashboardAccessFilter`

There are significant discrepancies between how these two determine whether a user has access to a dashboard.

According to `security_manager.raise_for_access`, a user can access a dashboard if and only if one of the following is true:
* The user is an admin
* The user is an owner of the dashboard
* The dashboard **is not** published !!
* The dashboard has no charts
* The user has access to at least one chart on the dashboard

According to `DashboardAccessFilter`, a user can access a dashboard if and only if one of the following is true:
* The user is an admin
* The user is an owner of the dashboard
* The user has access to at least one chart on the dashboard **and** the dashboard **is** published

The expected behavior we want going forward is the current behavior of `DashboardAccessFilter`


## Superset with `DASHBOARD_RBAC` enabled

Only entities whose access control behavior differs from out of the box Superset are listed here

### Dashboards

Having access to a dashboard implies the same things as when `DASHBOARD_RBAC` is disabled, with one caveat:
* If the user has access to the dashboard via a role, the user is also granted access to all charts/datasources in the dashboard, _only within the context of the dashboard_.

According to `security_manager.raise_for_access`, a user can access a dashboard if and only if one of the following is true:
* The user is an admin
* The user is an owner of the dashboard
* The dashboard does not have any associated roles **and** one of the conditions that grants access when `DASHBOARD_RBAC` is disabled is met
* The dashboard is published **and** the user has a role that is associated with the dashboard

According to `DashboardAccessFilter`, a user can access a dashboard if and only if one of the following is true:
* The user is an admin
* The user is an owner of the dashboard
* The dashboard does not have any associated roles **and** the user has access to at least one chart on the dashboard **and** the dashboard **is** published
* The dashboard is published **and** the user has a role that is associated with the dashboard

### Datasources

Having access to a datasource implies the same things as when `DASHBOARD_RBAC` is disabled.  However, it is now possible to have access to a datasource only in the context of a dashboard.

Only `security_manager.raise_for_access` is responsible for checking whether a user has access to a datasource in the context of a dashboard. A user can access a datasource in a dashboard context if and only if one of the following is true:
* The user has access to the datasource without a dashboard context
* The user has a role that is associated with the dashboard

## Guest users with `EMBEDDED_SUPERSET` enabled

Guest users currently should not have access to databases, charts, or datasources outside of a dashboard context.

### Dashboards

A guest user having access to a dashboard implies the same things as a regular having access to a dashboard, with one caveat:
* The user is also granted access to all charts/datasources in the dashboard, _only within the context of the dashboard_.

Classes/functions currently responsible for enforcing whether a guest user has access to a dashboard:
* `security_manager.has_guest_access`
* `DashboardAccessFilter`

The two agree on the logic here, which is that a guest user should have access to a dashboard if and only if **all** of the following are true:
* Embedded is enabled for the dashboard
* The guest token was granted access to the dashboard when it was created

## Misc notes

* `security_manager.get_accessible_databases` should check for `all_database_access`



