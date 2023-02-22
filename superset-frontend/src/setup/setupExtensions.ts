// For individual deployments to add custom overrides

// NOTE: This file is copied into superset/superset-frontend/src/setup/ at build, so all the
// imports are relative to that file location.
import { getUiOverrideRegistry, t } from '@superset-ui/core';
import EmbeddedDocsConfigDetails from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/EmbeddedDocsConfigDetails';
import SendInvitesButton from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/SendInvitesButton';
import ShareDashboardButton from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/ShareDashboardButton';
import SetupGuide from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/SetupGuide';
import SparkleTooltip, {
  SparkleTooltipForRightMenu,
} from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/SparkleTooltip';
import WelcomeMessage from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/WelcomeMessage';
import WelcomePage from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/WelcomePage';
import RootContextProviderExtension from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/RootContextProviderExtension';
import DbtCloudConfigForm from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/dbt-cloud/DbtCloudConfigForm';
import dbtLogo from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/dbt-cloud/dbtLogo';

const uiOverrideRegistry = getUiOverrideRegistry();

export default function setupExtensions() {
  uiOverrideRegistry.set('root.context.provider', RootContextProviderExtension);
  uiOverrideRegistry.set('alertsreports.header.icon', SparkleTooltip);
  uiOverrideRegistry.set(
    'embedded.documentation.configuration_details',
    EmbeddedDocsConfigDetails,
  );
  uiOverrideRegistry.set('embedded.documentation.description', () =>
    t('Preset Frontend SDK documentation.'),
  );
  uiOverrideRegistry.set(
    'embedded.documentation.url',
    'https://www.npmjs.com/package/@preset-sdk/embedded',
  );
  uiOverrideRegistry.set(
    'navbar.right-menu.item.icon',
    SparkleTooltipForRightMenu,
  );
  uiOverrideRegistry.set('navbar.right', SendInvitesButton);
  uiOverrideRegistry.set('report-modal.dropdown.item.icon', SparkleTooltip);
  uiOverrideRegistry.set('dashboard.nav.right', ShareDashboardButton);
  // Welcome components
  uiOverrideRegistry.set('welcome.banner', SetupGuide);
  uiOverrideRegistry.set('welcome.main.replacement', WelcomePage);
  uiOverrideRegistry.set('welcome.message', WelcomeMessage);
	// dbt Cloud component
  uiOverrideRegistry.set('databaseconnection.extensions', [
    {
      title: 'dbt Cloud',
      logo: dbtLogo,
      description: 'Sync dbt Cloud models as datasets for this database.',
      component: DbtCloudConfigForm,
    },
  ]);
}
