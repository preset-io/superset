// For individual deployments to add custom overrides

// NOTE: This file is copied into superset/superset-frontend/src/setup/ at build, so all the
// imports are relative to that file location.
import { getExtensionsRegistry, t } from '@superset-ui/core';
import EmbeddedDocsConfigDetails from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/EmbeddedDocsConfigDetails';
import EmbeddedModal from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/EmbeddedModal';
import NavbarRightExtension from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/NavbarRightExtension';
import DashboardRightNav from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/DashboardRightNav';
import SetupGuide from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/SetupGuide';
import SparkleTooltip, {
  SparkleTooltipForRightMenu,
} from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/SparkleTooltip';
import WelcomeMessage from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/WelcomeMessage';
import WelcomePage from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/WelcomePage';
import RootContextProviderExtension from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/RootContextProviderExtension';
import SSHTunnelSwitch from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/SSHTunnelSwitch';
import DbtCloudConfigForm from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/dbt-cloud/components/DbtCloudConfigForm';
import DbtLogo from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/dbt-cloud/components/DbtLogo';
import {
  deleteConfig,
  putConfig,
} from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/dbt-cloud/api';
import DbtCloudDescription from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/dbt-cloud/components/DbtCloudDescription';
import DatabaseDbtDatasets from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/dbt-cloud/components/DatabaseDbtDatasets';
import DbtDataset from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/dbt-cloud/components/DbtDataset';
import { isDbtAvailable } from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/dbt-cloud/utils';
import SQLAIAssistExtension from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/ai-assist/SQLAIAssistExtension';
import { SliceHeaderControlExtension } from 'src/setup/EXTENSIONS_DO_NOT_MODIFY/cord';

const extensionRegistry = getExtensionsRegistry();

export default function setupExtensions() {
  extensionRegistry.set('root.context.provider', RootContextProviderExtension);
  extensionRegistry.set('alertsreports.header.icon', SparkleTooltip);
  // TODO: rm old embedded extensions
  extensionRegistry.set(
    'embedded.documentation.configuration_details',
    EmbeddedDocsConfigDetails,
  );
  extensionRegistry.set('embedded.documentation.description', () =>
    t('Preset Frontend SDK documentation.'),
  );
  extensionRegistry.set(
    'embedded.documentation.url',
    'https://docs.preset.io/docs/dashboard-embedding',
  );
  extensionRegistry.set('embedded.modal', EmbeddedModal);
  extensionRegistry.set(
    'navbar.right-menu.item.icon',
    SparkleTooltipForRightMenu,
  );
  extensionRegistry.set('navbar.right', NavbarRightExtension);
  extensionRegistry.set('report-modal.dropdown.item.icon', SparkleTooltip);
  extensionRegistry.set('dashboard.nav.right', DashboardRightNav);
  // Welcome components
  extensionRegistry.set('welcome.banner', SetupGuide);
  extensionRegistry.set('welcome.main.replacement', WelcomePage);
  extensionRegistry.set('welcome.message', WelcomeMessage);
  // SSH Tunnel components
  extensionRegistry.set('ssh_tunnel.form.switch', SSHTunnelSwitch);
  // dbt Cloud  components
  extensionRegistry.set('databaseconnection.extraOption', {
    title: `dbt Cloud ${isDbtAvailable() ? '' : '⚡️'}`,
    logo: DbtLogo,
    description: DbtCloudDescription,
    component: DbtCloudConfigForm,
    onSave: putConfig as unknown as () => void,
    onDelete: ({ uuid }: { uuid: string }) => deleteConfig(uuid),
    enabled: isDbtAvailable,
  });
  extensionRegistry.set('database.delete.related', DatabaseDbtDatasets);
  extensionRegistry.set('dataset.delete.related', DbtDataset);
  extensionRegistry.set('sqleditor.extension.form', SQLAIAssistExtension);
  extensionRegistry.set('dashboard.slice.header', SliceHeaderControlExtension);
}
