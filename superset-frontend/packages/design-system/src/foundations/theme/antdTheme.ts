export const generateTheme = (theme: object) => {
  // #fafafa
  const bgElevated = theme?.colors?.background?.elevated ?? '#fafafa';
  const bgLight = theme?.colors?.background?.light ?? '#fff';
  const bgBase = theme?.colors?.background?.base ?? '#fff';
  const textPrimary = theme?.colors?.text?.primary ?? 'rgba(0, 0, 0, 0.85)';
  const colorPrimary = theme?.colors?.primary?.base ?? '#40a9ff';
  const colorDark = theme?.colors?.primary?.dark1 ?? '#1890ff';
  const colorTrans25 = theme?.colors?.shade?.t25 ?? 'rgba(0, 0, 0, 0.25)';
  const colorTrans45 = theme?.colors?.shade?.t45 ?? ' rgba(0, 0, 0, 0.45)';
  const colorTrans75 = theme?.colors?.shade?.t75 ?? ' rgba(0, 0, 0, 0.75)';
  const colorHighlight65 =
    theme?.colors?.highlight?.h65 ?? 'rgba(255, 255, 255, 0.65)';
  const bgHighlight = theme?.colors?.background?.elevated ?? '#f5f5f5';
  const bgHover = theme?.colors?.background?.elevated ?? '#dcf4ff';
  const borderLight = theme?.colors?.background?.elevated ?? '#f0f0f0';
  const antdTheme = `

body {
  color: ${textPrimary};
  font-family: ${
    theme?.typography?.families?.sansSerif ||
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
  };
  background-color: ${bgBase};
}

h6 {
  color: ${textPrimary};
}

a {
  color: ${colorDark};
}
a:hover {
  color: ${colorPrimary};
}
a:active {
  color: #096dd9;
}

a[disabled] {
  color: ${colorTrans25});
}

caption {
  color: ${colorTrans45};
}

mark {
  background-color: #feffe6;
}
::-moz-selection {
  color: ${bgLight};
  background: ${colorDark};
}
::selection {
  color: ${bgLight};
  background: ${colorDark};
}

html {
  --antd-wave-shadow-color: ${colorDark};
  --scroll-bar: 0;
}
[ant-click-animating-without-extra-node='true']::after,
.ant-click-animating-node {
  box-shadow: 0 0 0 0 ${colorDark};
}
@keyframes waveEffect {
  100% {
    box-shadow: 0 0 0 ${colorDark};
  }
}

.ant-collapse-content {
  color: ${textPrimary};
}

.ant-collapse {
  color: ${textPrimary};
}

.ant-alert {
  color: ${textPrimary};
}

.ant-alert-info .ant-alert-icon {
  color: ${colorDark};
}
.ant-alert-warning {
  background-color: ${bgLight}be6;
  border: 1px solid #ffe58f;
}
.ant-alert-warning .ant-alert-icon {
  color: #faad14;
}
.ant-alert-error {
  background-color: ${bgLight}2f0;
  border: 1px solid #ffccc7;
}
.ant-alert-error .ant-alert-icon {
  color: #ff4d4f;
}

.ant-alert-close-icon .anticon-close {
  color: ${colorTrans45};
  transition: color 0.3s;
}
.ant-alert-close-icon .anticon-close:hover {
  color: ${colorTrans75};
}
.ant-alert-close-text {
  color: ${colorTrans45};
  transition: color 0.3s;
}
.ant-alert-close-text:hover {
  color: ${colorTrans75};
}

.ant-alert-with-description .ant-alert-message {
  color: ${textPrimary};
}
.ant-alert-message {
  color: ${textPrimary};
}

.ant-anchor {
  color: ${textPrimary};
}

.ant-anchor-ink::before {
  background-color: ${borderLight};;
}
.ant-anchor-ink-ball {
  background-color: ${bgLight};
  border: 2px solid ${colorDark};
}

.ant-anchor-link-title {
  color: ${textPrimary};
}

.ant-anchor-link-active > .ant-anchor-link-title {
  color: ${colorDark};
}

.ant-select-auto-complete {
  color: ${textPrimary};
}

.ant-select-disabled.ant-select-multiple .ant-select-selector {
  background: ${bgHighlight};
}

.ant-select-multiple .ant-select-selection-item {
  background: ${bgHighlight};
  border: 1px solid ${borderLight};;
}
.ant-select-disabled.ant-select-multiple .ant-select-selection-item {
  color: #bfbfbf;
  border-color: #d9d9d9;
}


.ant-select-multiple .ant-select-selection-item-remove {
  color: ${colorTrans45};
}

.ant-select-multiple .ant-select-selection-item-remove:hover {
  color: ${colorTrans75};
}

.ant-select-multiple .ant-select-selection-search-mirror {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.ant-select-status-error.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector {
  background-color: ${bgLight};
  border-color: #ff4d4f !important;
}
.ant-select-status-error.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer).ant-select-open .ant-select-selector,
.ant-select-status-error.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer).ant-select-focused .ant-select-selector {
  border-color: #ff7875;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}
.ant-select-status-warning.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector {
  background-color: ${bgLight};
  border-color: #faad14 !important;
}
.ant-select-status-warning.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer).ant-select-open .ant-select-selector,
.ant-select-status-warning.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer).ant-select-focused .ant-select-selector {
  border-color: #ffc53d;
  box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);
}


.ant-select {
  color: ${textPrimary};
}
.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}

.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  color: ${colorTrans25});
  background: ${bgHighlight};
}
.ant-select-multiple.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  background: ${bgHighlight};
}

.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
  border-color: ${colorPrimary};
}

.ant-select-selection-placeholder {
  color: #bfbfbf;
}

.ant-select-arrow {
  color: ${colorTrans25});
}

.ant-select-clear {
  color: ${colorTrans25});
  background: ${bgLight};
}

.ant-select-clear:hover {
  color: ${colorTrans45};
}

.ant-select-dropdown {
  color: ${textPrimary};
  background-color: ${bgLight};
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.ant-select-dropdown-empty {
  color: ${colorTrans25});
}
.ant-select-item-empty {
  color: ${textPrimary};
  color: ${colorTrans25});
}
.ant-select-item {
  color: ${textPrimary};
}
.ant-select-item-group {
  color: ${colorTrans45};
}

.ant-select-item-option-active:not(.ant-select-item-option-disabled) {
  background-color: ${bgHighlight};
}
.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
  color: ${textPrimary};
  font-weight: 600;
  background-color: #e6f7ff;
}
.ant-select-item-option-selected:not(.ant-select-item-option-disabled) .ant-select-item-option-state {
  color: ${colorDark};
}
.ant-select-item-option-disabled {
  color: ${colorTrans25});
  cursor: not-allowed;
}
.ant-select-item-option-disabled.ant-select-item-option-selected {
  background-color: ${bgHighlight};
}

.ant-empty-normal {
  margin: 32px 0;
  color: ${colorTrans25});
}

.ant-empty-small {
  margin: 8px 0;
  color: ${colorTrans25});
}

.ant-empty-img-default-ellipse {
  fill: ${bgHighlight};
  fill-opacity: 0.8;
}
.ant-empty-img-default-path-1 {
  fill: #aeb8c2;
}
.ant-empty-img-default-path-3 {
  fill: #f5f5f7;
}
.ant-empty-img-default-path-4 {
  fill: #dce0e6;
}
.ant-empty-img-default-path-5 {
  fill: #dce0e6;
}
.ant-empty-img-default-g {
  fill: ${bgLight};
}
.ant-empty-img-simple-ellipse {
  fill: ${bgHighlight};
}
.ant-empty-img-simple-g {
  stroke: #d9d9d9;
}
.ant-empty-img-simple-path {
  fill: #fafafa;
}

.ant-avatar {
  color: ${textPrimary};
  color: ${bgLight};
}

.ant-avatar-group .ant-avatar {
  border: 1px solid ${bgLight};
}
.
.ant-popover {
  color: ${textPrimary};
}

.ant-popover-inner {
  background-color: ${bgLight};
}

.ant-popover-title {
  color: ${textPrimary};
  border-bottom: 1px solid ${borderLight};;
}
.ant-popover-inner-content {
  color: ${textPrimary};
}
.ant-popover-message {
  color: ${textPrimary};
}

.ant-popover-arrow-content {
  --antd-arrow-background-color: ${bgLight};
}

.ant-popover-pink .ant-popover-inner {
  background-color: #eb2f96;
}
.ant-popover-pink .ant-popover-arrow-content {
  background-color: #eb2f96;
}
.ant-popover-magenta .ant-popover-inner {
  background-color: #eb2f96;
}
.ant-popover-magenta .ant-popover-arrow-content {
  background-color: #eb2f96;
}
.ant-popover-red .ant-popover-inner {
  background-color: #f5222d;
}
.ant-popover-red .ant-popover-arrow-content {
  background-color: #f5222d;
}
.ant-popover-volcano .ant-popover-inner {
  background-color: #fa541c;
}
.ant-popover-volcano .ant-popover-arrow-content {
  background-color: #fa541c;
}
.ant-popover-orange .ant-popover-inner {
  background-color: #fa8c16;
}
.ant-popover-orange .ant-popover-arrow-content {
  background-color: #fa8c16;
}
.ant-popover-yellow .ant-popover-inner {
  background-color: #fadb14;
}
.ant-popover-yellow .ant-popover-arrow-content {
  background-color: #fadb14;
}
.ant-popover-gold .ant-popover-inner {
  background-color: #faad14;
}
.ant-popover-gold .ant-popover-arrow-content {
  background-color: #faad14;
}
.ant-popover-cyan .ant-popover-inner {
  background-color: #13c2c2;
}
.ant-popover-cyan .ant-popover-arrow-content {
  background-color: #13c2c2;
}
.ant-popover-lime .ant-popover-inner {
  background-color: #a0d911;
}
.ant-popover-lime .ant-popover-arrow-content {
  background-color: #a0d911;
}
.ant-popover-green .ant-popover-inner {
  background-color: #52c41a;
}
.ant-popover-green .ant-popover-arrow-content {
  background-color: #52c41a;
}
.ant-popover-blue .ant-popover-inner {
  background-color: ${colorDark};
}
.ant-popover-blue .ant-popover-arrow-content {
  background-color: ${colorDark};
}
.ant-popover-geekblue .ant-popover-inner {
  background-color: #2f54eb;
}
.ant-popover-geekblue .ant-popover-arrow-content {
  background-color: #2f54eb;
}
.ant-popover-purple .ant-popover-inner {
  background-color: #722ed1;
}
.ant-popover-purple .ant-popover-arrow-content {
  background-color: #722ed1;
}

.ant-back-top {
  color: ${textPrimary};
}

.ant-back-top-content {
  color: ${bgLight};
  background-color: ${colorTrans45};
}
.ant-back-top-content:hover {
  background-color: ${textPrimary};
}

.ant-badge {
  color: ${textPrimary};
}
.ant-badge-count {
  color: ${bgLight};
  box-shadow: 0 0 0 1px ${bgLight};
}
.ant-badge-count a,
.ant-badge-count a:hover {
  color: ${bgLight};
}

.ant-badge-dot {
  box-shadow: 0 0 0 1px ${bgLight};
}

.ant-badge-status-success {
  background-color: #52c41a;
}
.ant-badge-status-processing {
  background-color: ${colorDark};
}
.ant-badge-status-processing::after {
  border: 1px solid ${colorDark};
}
.ant-badge-status-default {
  background-color: #d9d9d9;
}
.ant-badge-status-error {
  background-color: #ff4d4f;
}
.ant-badge-status-warning {
  background-color: #faad14;
}
.ant-badge-status-pink {
  background: #eb2f96;
}
.ant-badge-status-magenta {
  background: #eb2f96;
}
.ant-badge-status-red {
  background: #f5222d;
}
.ant-badge-status-volcano {
  background: #fa541c;
}
.ant-badge-status-orange {
  background: #fa8c16;
}
.ant-badge-status-yellow {
  background: #fadb14;
}
.ant-badge-status-gold {
  background: #faad14;
}
.ant-badge-status-cyan {
  background: #13c2c2;
}
.ant-badge-status-lime {
  background: #a0d911;
}
.ant-badge-status-green {
  background: #52c41a;
}
.ant-badge-status-blue {
  background: ${colorDark};
}
.ant-badge-status-geekblue {
  background: #2f54eb;
}
.ant-badge-status-purple {
  background: #722ed1;
}
.ant-badge-status-text {
  color: ${textPrimary};
}

.ant-ribbon {
  color: ${textPrimary};
  color: ${bgLight};
  background-color: ${colorDark};
}
.ant-ribbon-text {
  color: ${bgLight};
}

.ant-ribbon-corner::after {

  color: ${colorTrans25});

}

.ant-ribbon-color-pink {
  color: #eb2f96;
  background: #eb2f96;
}
.ant-ribbon-color-magenta {
  color: #eb2f96;
  background: #eb2f96;
}
.ant-ribbon-color-red {
  color: #f5222d;
  background: #f5222d;
}
.ant-ribbon-color-volcano {
  color: #fa541c;
  background: #fa541c;
}
.ant-ribbon-color-orange {
  color: #fa8c16;
  background: #fa8c16;
}
.ant-ribbon-color-yellow {
  color: #fadb14;
  background: #fadb14;
}
.ant-ribbon-color-gold {
  color: #faad14;
  background: #faad14;
}
.ant-ribbon-color-cyan {
  color: #13c2c2;
  background: #13c2c2;
}
.ant-ribbon-color-lime {
  color: #a0d911;
  background: #a0d911;
}
.ant-ribbon-color-green {
  color: #52c41a;
  background: #52c41a;
}
.ant-ribbon-color-blue {
  color: ${colorDark};
  background: ${colorDark};
}
.ant-ribbon-color-geekblue {
  color: #2f54eb;
  background: #2f54eb;
}
.ant-ribbon-color-purple {
  color: #722ed1;
  background: #722ed1;
}
.ant-ribbon.ant-ribbon-placement-end {
  right: -8px;
  border-bottom-right-radius: 0;
}
.ant-ribbon.ant-ribbon-placement-end .ant-ribbon-corner {
  right: 0;
  border-color: currentcolor transparent transparent currentcolor;
}

.ant-breadcrumb {
  color: ${textPrimary};
  color: ${colorTrans45};
}

.ant-breadcrumb a {
  color: ${colorTrans45};
  transition: color 0.3s;
}
.ant-breadcrumb a:hover {
  color: ${textPrimary};
}
.ant-breadcrumb li:last-child {
  color: ${textPrimary};
}
.ant-breadcrumb li:last-child a {
  color: ${textPrimary};
}
li:last-child > .ant-breadcrumb-separator {
  display: none;
}
.ant-breadcrumb-separator {
  margin: 0 8px;
  color: ${colorTrans45};
}

.ant-dropdown-menu-item.ant-dropdown-menu-item-danger {
  color: #ff4d4f;
}
.ant-dropdown-menu-item.ant-dropdown-menu-item-danger:hover {
  color: ${bgLight};
  background-color: #ff4d4f;
}
.ant-dropdown {
  color: ${textPrimary};
}

.ant-dropdown-arrow::before {
  background: ${bgLight};
}

.ant-dropdown-menu {
  background-color: ${bgLight};
}
.ant-dropdown-menu-item-group-title {
  color: ${colorTrans45};
}

.ant-dropdown-menu-item,
.ant-dropdown-menu-submenu-title {
  color: ${textPrimary};
}
.ant-dropdown-menu-item-selected,
.ant-dropdown-menu-submenu-title-selected {
  color: ${colorDark};
  background-color: #e6f7ff;
}
.ant-dropdown-menu-item:hover,
.ant-dropdown-menu-submenu-title:hover,
.ant-dropdown-menu-item.ant-dropdown-menu-item-active,
.ant-dropdown-menu-item.ant-dropdown-menu-submenu-title-active,
.ant-dropdown-menu-submenu-title.ant-dropdown-menu-item-active,
.ant-dropdown-menu-submenu-title.ant-dropdown-menu-submenu-title-active {
  background-color: ${bgHighlight};
}
.ant-dropdown-menu-item-disabled,
.ant-dropdown-menu-submenu-title-disabled {
  color: ${colorTrans25});
  cursor: not-allowed;
}
.ant-dropdown-menu-item-disabled:hover,
.ant-dropdown-menu-submenu-title-disabled:hover {
  color: ${colorTrans25});
  background-color: ${bgLight};
  cursor: not-allowed;
}

.ant-dropdown-menu-item-divider,
.ant-dropdown-menu-submenu-title-divider {
  background-color: ${borderLight};;
}

.ant-dropdown-menu-item .ant-dropdown-menu-submenu-expand-icon .ant-dropdown-menu-submenu-arrow-icon,
.ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-expand-icon .ant-dropdown-menu-submenu-arrow-icon {
  color: ${colorTrans45};
}

.ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-disabled .ant-dropdown-menu-submenu-title,
.ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-disabled .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow-icon {
  color: ${colorTrans25});
  background-color: ${bgLight};
}
.ant-dropdown-menu-submenu-selected .ant-dropdown-menu-submenu-title {
  color: ${colorDark};
}

.ant-dropdown-menu-dark,
.ant-dropdown-menu-dark .ant-dropdown-menu {
  background: #001529;
}
.ant-dropdown-menu-dark .ant-dropdown-menu-item,
.ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title,
.ant-dropdown-menu-dark .ant-dropdown-menu-item > a,
.ant-dropdown-menu-dark .ant-dropdown-menu-item > .anticon + span > a {
  color: ${colorHighlight65};
}
.ant-dropdown-menu-dark .ant-dropdown-menu-item .ant-dropdown-menu-submenu-arrow::after,
.ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title .ant-dropdown-menu-submenu-arrow::after,
.ant-dropdown-menu-dark .ant-dropdown-menu-item > a .ant-dropdown-menu-submenu-arrow::after,
.ant-dropdown-menu-dark .ant-dropdown-menu-item > .anticon + span > a .ant-dropdown-menu-submenu-arrow::after {
  color: ${colorHighlight65};
}
.ant-dropdown-menu-dark .ant-dropdown-menu-item:hover,
.ant-dropdown-menu-dark .ant-dropdown-menu-submenu-title:hover,
.ant-dropdown-menu-dark .ant-dropdown-menu-item > a:hover,
.ant-dropdown-menu-dark .ant-dropdown-menu-item > .anticon + span > a:hover {
  color: ${bgLight};
  background: transparent;
}
.ant-dropdown-menu-dark .ant-dropdown-menu-item-selected,
.ant-dropdown-menu-dark .ant-dropdown-menu-item-selected:hover,
.ant-dropdown-menu-dark .ant-dropdown-menu-item-selected > a {
  color: ${bgLight};
  background: ${colorDark};
}

.ant-btn {
  color: ${textPrimary};
  border-color: #d9d9d9;
  background: ${bgLight};
}

.ant-btn:hover,
.ant-btn:focus {
  color: ${colorPrimary};
  border-color: ${colorPrimary};
  background: ${bgLight};
}

.ant-btn:active {
  color: #096dd9;
  border-color: #096dd9;
  background: ${bgLight};
}

.ant-btn[disabled],
.ant-btn[disabled]:hover,
.ant-btn[disabled]:focus,
.ant-btn[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}

.ant-btn:hover,
.ant-btn:focus,
.ant-btn:active {
  background: ${bgLight};
}

.ant-btn-primary {
  color: ${bgLight};
  border-color: ${colorDark};
  background: ${colorDark};
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn-primary:hover,
.ant-btn-primary:focus {
  color: ${bgLight};
  border-color: ${colorPrimary};
  background: ${colorPrimary};
}

.ant-btn-primary:active {
  color: ${bgLight};
  border-color: #096dd9;
  background: #096dd9;
}

.ant-btn-primary[disabled],
.ant-btn-primary[disabled]:hover,
.ant-btn-primary[disabled]:focus,
.ant-btn-primary[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
  text-shadow: none;
  box-shadow: none;
}

.ant-btn-group .ant-btn-primary:not(:first-child):not(:last-child) {
  border-right-color: ${colorPrimary};
  border-left-color: ${colorPrimary};
}
.ant-btn-group .ant-btn-primary:not(:first-child):not(:last-child):disabled {
  border-color: #d9d9d9;
}
.ant-btn-group .ant-btn-primary:first-child:not(:last-child) {
  border-right-color: ${colorPrimary};
}
.ant-btn-group .ant-btn-primary:first-child:not(:last-child)[disabled] {
  border-right-color: #d9d9d9;
}
.ant-btn-group .ant-btn-primary:last-child:not(:first-child),
.ant-btn-group .ant-btn-primary + .ant-btn-primary {
  border-left-color: ${colorPrimary};
}
.ant-btn-group .ant-btn-primary:last-child:not(:first-child)[disabled],
.ant-btn-group .ant-btn-primary + .ant-btn-primary[disabled] {
  border-left-color: #d9d9d9;
}
.ant-btn-ghost {
  color: ${textPrimary};
  border-color: #d9d9d9;
}

.ant-btn-ghost:hover,
.ant-btn-ghost:focus {
  color: ${colorPrimary};
  border-color: ${colorPrimary};
}

.ant-btn-ghost:active {
  color: #096dd9;
  border-color: #096dd9;
  background: transparent;
}

.ant-btn-ghost[disabled],
.ant-btn-ghost[disabled]:hover,
.ant-btn-ghost[disabled]:focus,
.ant-btn-ghost[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}

.ant-btn-dashed {
  color: ${textPrimary};
  border-color: #d9d9d9;
  background: ${bgLight};
  border-style: dashed;
}

.ant-btn-dashed:hover,
.ant-btn-dashed:focus {
  color: ${colorPrimary};
  border-color: ${colorPrimary};
  background: ${bgLight};
}

.ant-btn-dashed:active {
  color: #096dd9;
  border-color: #096dd9;
  background: ${bgLight};
}

.ant-btn-dashed[disabled],
.ant-btn-dashed[disabled]:hover,
.ant-btn-dashed[disabled]:focus,
.ant-btn-dashed[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}

.ant-btn-danger {
  color: ${bgLight};
  border-color: #ff4d4f;
  background: #ff4d4f;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn-danger:hover,
.ant-btn-danger:focus {
  color: ${bgLight};
  border-color: #ff7875;
  background: #ff7875;
}

.ant-btn-danger:active {
  color: ${bgLight};
  border-color: #d9363e;
  background: #d9363e;
}

.ant-btn-danger[disabled],
.ant-btn-danger[disabled]:hover,
.ant-btn-danger[disabled]:focus,
.ant-btn-danger[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
  text-shadow: none;
  box-shadow: none;
}

.ant-btn-link {
  color: ${colorDark};
  border-color: transparent;
  background: transparent;
  box-shadow: none;
}

.ant-btn-link:hover,
.ant-btn-link:focus {
  color: ${colorPrimary};
  border-color: ${colorPrimary};
  background: transparent;
}

.ant-btn-link[disabled],
.ant-btn-link[disabled]:hover,
.ant-btn-link[disabled]:focus,
.ant-btn-link[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}

.ant-btn-link[disabled],
.ant-btn-link[disabled]:hover,
.ant-btn-link[disabled]:focus,
.ant-btn-link[disabled]:active {
  color: ${colorTrans25});
}

.ant-btn-text {
  color: ${textPrimary};
}

.ant-btn-text:hover,
.ant-btn-text:focus {
  color: ${colorPrimary};
  border-color: ${colorPrimary};
}

.ant-btn-text:active {
  color: #096dd9;
  border-color: #096dd9;
}

.ant-btn-text[disabled],
.ant-btn-text[disabled]:hover,
.ant-btn-text[disabled]:focus,
.ant-btn-text[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}

.ant-btn-text:hover,
.ant-btn-text:focus {
  color: ${textPrimary};
  background: rgba(0, 0, 0, 0.018);
  border-color: transparent;
}
.ant-btn-text:active {
  color: ${textPrimary};
  background: rgba(0, 0, 0, 0.028);
  border-color: transparent;
}
.ant-btn-text[disabled],
.ant-btn-text[disabled]:hover,
.ant-btn-text[disabled]:focus,
.ant-btn-text[disabled]:active {
  color: ${colorTrans25});
}

.ant-btn-dangerous {
  color: #ff4d4f;
  border-color: #ff4d4f;
  background: ${bgLight};
}

.ant-btn-dangerous:hover,
.ant-btn-dangerous:focus {
  color: #ff7875;
  border-color: #ff7875;
  background: ${bgLight};
}

.ant-btn-dangerous:active {
  color: #d9363e;
  border-color: #d9363e;
  background: ${bgLight};
}

.ant-btn-dangerous[disabled],
.ant-btn-dangerous[disabled]:hover,
.ant-btn-dangerous[disabled]:focus,
.ant-btn-dangerous[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}

.ant-btn-dangerous.ant-btn-primary {
  color: ${bgLight};
  border-color: #ff4d4f;
  background: #ff4d4f;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn-dangerous.ant-btn-primary:hover,
.ant-btn-dangerous.ant-btn-primary:focus {
  color: ${bgLight};
  border-color: #ff7875;
  background: #ff7875;
}

.ant-btn-dangerous.ant-btn-primary:active {
  color: ${bgLight};
  border-color: #d9363e;
  background: #d9363e;
}

.ant-btn-dangerous.ant-btn-primary[disabled],
.ant-btn-dangerous.ant-btn-primary[disabled]:hover,
.ant-btn-dangerous.ant-btn-primary[disabled]:focus,
.ant-btn-dangerous.ant-btn-primary[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}

.ant-btn-dangerous.ant-btn-link {
  color: #ff4d4f;
}

.ant-btn-dangerous.ant-btn-link:hover,
.ant-btn-dangerous.ant-btn-link:focus {
  color: ${colorPrimary};
  border-color: ${colorPrimary};
}

.ant-btn-dangerous.ant-btn-link[disabled],
.ant-btn-dangerous.ant-btn-link[disabled]:hover,
.ant-btn-dangerous.ant-btn-link[disabled]:focus,
.ant-btn-dangerous.ant-btn-link[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}
.ant-btn-dangerous.ant-btn-link[disabled],
.ant-btn-dangerous.ant-btn-link[disabled]:hover,
.ant-btn-dangerous.ant-btn-link[disabled]:focus,
.ant-btn-dangerous.ant-btn-link[disabled]:active {
  color: ${colorTrans25});
}
.ant-btn-dangerous.ant-btn-text:hover,
.ant-btn-dangerous.ant-btn-text:focus {
  color: ${colorPrimary};
  border-color: ${colorPrimary};
}
.ant-btn-dangerous.ant-btn-text[disabled],
.ant-btn-dangerous.ant-btn-text[disabled]:hover,
.ant-btn-dangerous.ant-btn-text[disabled]:focus,
.ant-btn-dangerous.ant-btn-text[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}
.ant-btn-dangerous.ant-btn-text[disabled],
.ant-btn-dangerous.ant-btn-text[disabled]:hover,
.ant-btn-dangerous.ant-btn-text[disabled]:focus,
.ant-btn-dangerous.ant-btn-text[disabled]:active {
  color: ${colorTrans25});
}
.ant-btn::before {
  background: ${bgLight};
}
.ant-btn.ant-btn-background-ghost {
  color: ${bgLight};
  border-color: ${bgLight};
}

.ant-btn.ant-btn-background-ghost:hover,
.ant-btn.ant-btn-background-ghost:focus {
  color: ${colorPrimary};
  border-color: ${colorPrimary};
}
.ant-btn.ant-btn-background-ghost:active {
  color: #096dd9;
  border-color: #096dd9;
}
.ant-btn.ant-btn-background-ghost[disabled] {
  color: ${colorTrans25});
  background: transparent;
  border-color: #d9d9d9;
}
.ant-btn-background-ghost.ant-btn-primary {
  color: ${colorDark};
  border-color: ${colorDark};
  text-shadow: none;
}

.ant-btn-background-ghost.ant-btn-primary:hover,
.ant-btn-background-ghost.ant-btn-primary:focus {
  color: ${colorPrimary};
  border-color: ${colorPrimary};
}
.ant-btn-background-ghost.ant-btn-primary[disabled],
.ant-btn-background-ghost.ant-btn-primary[disabled]:hover,
.ant-btn-background-ghost.ant-btn-primary[disabled]:focus,
.ant-btn-background-ghost.ant-btn-primary[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}
.ant-btn-background-ghost.ant-btn-danger[disabled],
.ant-btn-background-ghost.ant-btn-danger[disabled]:hover,
.ant-btn-background-ghost.ant-btn-danger[disabled]:focus,
.ant-btn-background-ghost.ant-btn-danger[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}
.ant-btn-background-ghost.ant-btn-dangerous[disabled],
.ant-btn-background-ghost.ant-btn-dangerous[disabled]:hover,
.ant-btn-background-ghost.ant-btn-dangerous[disabled]:focus,
.ant-btn-background-ghost.ant-btn-dangerous[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}
.ant-btn-background-ghost.ant-btn-dangerous.ant-btn-link[disabled],
.ant-btn-background-ghost.ant-btn-dangerous.ant-btn-link[disabled]:hover,
.ant-btn-background-ghost.ant-btn-dangerous.ant-btn-link[disabled]:focus,
.ant-btn-background-ghost.ant-btn-dangerous.ant-btn-link[disabled]:active {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  background: ${bgHighlight};
}
a.ant-btn-disabled,
a.ant-btn-disabled:hover,
a.ant-btn-disabled:focus,
a.ant-btn-disabled:active {
  color: ${colorTrans25});
}
.ant-btn-compact-item.ant-btn-primary:not([disabled]) + .ant-btn-compact-item.ant-btn-primary:not([disabled])::after {
  background-color: ${colorPrimary};
}
.ant-btn-compact-vertical-item.ant-btn-primary:not([disabled]) + .ant-btn-compact-vertical-item.ant-btn-primary:not([disabled])::after {
  background-color: ${colorPrimary};
}

.ant-btn-group-rtl.ant-btn-group .ant-btn-primary:last-child:not(:first-child),
.ant-btn-group-rtl.ant-btn-group .ant-btn-primary + .ant-btn-primary {
  border-right-color: ${colorPrimary};
  border-left-color: #d9d9d9;
}
.ant-btn-group-rtl.ant-btn-group .ant-btn-primary:last-child:not(:first-child)[disabled],
.ant-btn-group-rtl.ant-btn-group .ant-btn-primary + .ant-btn-primary[disabled] {
  border-right-color: #d9d9d9;
  border-left-color: ${colorPrimary};
}

/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */
/* stylelint-disable no-duplicate-selectors */
/* stylelint-disable */
/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */
.ant-menu-item-danger.ant-menu-item {
  color: #ff4d4f;
}
.ant-menu-item-danger.ant-menu-item:hover,
.ant-menu-item-danger.ant-menu-item-active {
  color: #ff4d4f;
}
.ant-menu-item-danger.ant-menu-item:active {
  background: #fff1f0;
}
.ant-menu-item-danger.ant-menu-item-selected {
  color: #ff4d4f;
}
.ant-menu-item-danger.ant-menu-item-selected > a,
.ant-menu-item-danger.ant-menu-item-selected > a:hover {
  color: #ff4d4f;
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-danger.ant-menu-item-selected {
  background-color: ${bgLight}1f0;
}
.ant-menu-inline .ant-menu-item-danger.ant-menu-item::after {
  border-right-color: #ff4d4f;
}
.ant-menu-dark .ant-menu-item-danger.ant-menu-item,
.ant-menu-dark .ant-menu-item-danger.ant-menu-item:hover,
.ant-menu-dark .ant-menu-item-danger.ant-menu-item > a {
  color: #ff4d4f;
}
.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-danger.ant-menu-item-selected {
  color: ${bgLight};
  background-color: #ff4d4f;
}
.ant-menu {
  color: ${textPrimary};
  background: ${bgLight};
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.ant-menu-item-group-title {
  color: ${colorTrans45};
}

.ant-menu-submenu-selected {
  color: ${colorDark};
}
.ant-menu-item:active,
.ant-menu-submenu-title:active {
  background: #e6f7ff;
}

.ant-menu-item a {
  color: ${textPrimary};
}
.ant-menu-item a:hover {
  color: ${colorDark};
}

.ant-menu-item > .ant-badge a {
  color: ${textPrimary};
}
.ant-menu-item > .ant-badge a:hover {
  color: ${colorDark};
}
.ant-menu-item-divider {
  border-color: ${borderLight};;
}

.ant-menu-item-selected {
  color: ${colorDark};
}
.ant-menu-item-selected a,
.ant-menu-item-selected a:hover {
  color: ${colorDark};
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #e6f7ff;
}
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: 1px solid ${borderLight};;
}
.ant-menu-vertical-right {
  border-left: 1px solid ${borderLight};;
}

.ant-menu-submenu > .ant-menu {
  background-color: ${bgLight};
  border-radius: 2px;
}

.ant-menu-submenu-popup > .ant-menu {
  background-color: ${bgLight};
}
.ant-menu-submenu-expand-icon,
.ant-menu-submenu-arrow {
  color: ${textPrimary};
}

.ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-expand-icon,
.ant-menu-submenu:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow {
  color: ${colorDark};
}

.ant-menu-vertical .ant-menu-submenu-selected,
.ant-menu-vertical-left .ant-menu-submenu-selected,
.ant-menu-vertical-right .ant-menu-submenu-selected {
  color: ${colorDark};
}
.ant-menu-horizontal {
  border-bottom: 1px solid ${borderLight};;
}

.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected {
  color: ${colorDark};
}
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected::after {
  border-bottom: 2px solid ${colorDark};
}

.ant-menu-horizontal > .ant-menu-item a {
  color: ${textPrimary};
}
.ant-menu-horizontal > .ant-menu-item a:hover {
  color: ${colorDark};
}
.ant-menu-horizontal > .ant-menu-item a::before {
  bottom: -2px;
}
.ant-menu-horizontal > .ant-menu-item-selected a {
  color: ${colorDark};
}

.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  border-right: 3px solid ${colorDark};
}

.ant-menu-sub.ant-menu-inline {
  background: ${bgElevated};
}

.ant-menu-item-disabled,
.ant-menu-submenu-disabled {
  color: ${colorTrans25}) !important;
}

.ant-menu-item-disabled a,
.ant-menu-submenu-disabled a {
  color: ${colorTrans25}) !important;
}
.ant-menu-item-disabled > .ant-menu-submenu-title,
.ant-menu-submenu-disabled > .ant-menu-submenu-title {
  color: ${colorTrans25}) !important;
  cursor: not-allowed;
}
.ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,
.ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,
.ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,
.ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after {
  background: ${colorTrans25}) !important;
}

.ant-menu-inline-collapsed-tooltip a,
.ant-menu-inline-collapsed-tooltip a:hover {
  color: ${bgLight};
}
.ant-menu-light .ant-menu-item:hover,
.ant-menu-light .ant-menu-item-active,
.ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
.ant-menu-light .ant-menu-submenu-active,
.ant-menu-light .ant-menu-submenu-title:hover {
  color: ${colorDark};
}
.ant-menu.ant-menu-root:focus-visible {
  box-shadow: 0 0 0 2px #096dd9;
}
.ant-menu-dark .ant-menu-item:focus-visible,
.ant-menu-dark .ant-menu-submenu-title:focus-visible {
  box-shadow: 0 0 0 2px #096dd9;
}
.ant-menu.ant-menu-dark,
.ant-menu-dark .ant-menu-sub,
.ant-menu.ant-menu-dark .ant-menu-sub {
  color: ${colorHighlight65};
  background: #001529;
}

.ant-menu.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow::after,
.ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow::after,
.ant-menu.ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow::after,
.ant-menu.ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow::before,
.ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow::before,
.ant-menu.ant-menu-dark .ant-menu-sub .ant-menu-submenu-title .ant-menu-submenu-arrow::before {
  background: ${bgLight};
}

.ant-menu-dark.ant-menu-horizontal > .ant-menu-item,
.ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu {
  border-color: #001529;
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover {
  background-color: ${colorDark};
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item > a::before {
  bottom: 0;
}
.ant-menu-dark .ant-menu-item,
.ant-menu-dark .ant-menu-item-group-title,
.ant-menu-dark .ant-menu-item > a,
.ant-menu-dark .ant-menu-item > span > a {
  color: ${colorHighlight65};
}
.ant-menu-dark.ant-menu-inline,
.ant-menu-dark.ant-menu-vertical,
.ant-menu-dark.ant-menu-vertical-left,
.ant-menu-dark.ant-menu-vertical-right {
  border-right: 0;
}
.ant-menu-dark.ant-menu-inline .ant-menu-item,
.ant-menu-dark.ant-menu-vertical .ant-menu-item,
.ant-menu-dark.ant-menu-vertical-left .ant-menu-item,
.ant-menu-dark.ant-menu-vertical-right .ant-menu-item {
  left: 0;
  margin-left: 0;
  border-right: 0;
}
.ant-menu-dark.ant-menu-inline .ant-menu-item::after,
.ant-menu-dark.ant-menu-vertical .ant-menu-item::after,
.ant-menu-dark.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-dark.ant-menu-vertical-right .ant-menu-item::after {
  border-right: 0;
}
.ant-menu-dark.ant-menu-inline .ant-menu-item,
.ant-menu-dark.ant-menu-inline .ant-menu-submenu-title {
  width: 100%;
}
.ant-menu-dark .ant-menu-item:hover,
.ant-menu-dark .ant-menu-item-active,
.ant-menu-dark .ant-menu-submenu-active,
.ant-menu-dark .ant-menu-submenu-open,
.ant-menu-dark .ant-menu-submenu-selected,
.ant-menu-dark .ant-menu-submenu-title:hover {
  color: ${bgLight};
}
.ant-menu-dark .ant-menu-item:hover > a,
.ant-menu-dark .ant-menu-item-active > a,
.ant-menu-dark .ant-menu-submenu-active > a,
.ant-menu-dark .ant-menu-submenu-open > a,
.ant-menu-dark .ant-menu-submenu-selected > a,
.ant-menu-dark .ant-menu-submenu-title:hover > a,
.ant-menu-dark .ant-menu-item:hover > span > a,
.ant-menu-dark .ant-menu-item-active > span > a,
.ant-menu-dark .ant-menu-submenu-active > span > a,
.ant-menu-dark .ant-menu-submenu-open > span > a,
.ant-menu-dark .ant-menu-submenu-selected > span > a,
.ant-menu-dark .ant-menu-submenu-title:hover > span > a {
  color: ${bgLight};
}

.ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,
.ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,
.ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,
.ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,
.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,
.ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,
.ant-menu-dark .ant-menu-item:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,
.ant-menu-dark .ant-menu-item-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,
.ant-menu-dark .ant-menu-submenu-active > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,
.ant-menu-dark .ant-menu-submenu-open > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,
.ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,
.ant-menu-dark .ant-menu-submenu-title:hover > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before {
  background: ${bgLight};
}

.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: ${colorDark};
}
.ant-menu-dark .ant-menu-item-selected {
  color: ${bgLight};
}

.ant-menu-dark .ant-menu-item-selected > a,
.ant-menu-dark .ant-menu-item-selected > span > a,
.ant-menu-dark .ant-menu-item-selected > a:hover,
.ant-menu-dark .ant-menu-item-selected > span > a:hover {
  color: ${bgLight};
}
.ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon,
.ant-menu-dark .ant-menu-item-selected .anticon {
  color: ${bgLight};
}
.ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon + span,
.ant-menu-dark .ant-menu-item-selected .anticon + span {
  color: ${bgLight};
}
.ant-menu.ant-menu-dark .ant-menu-item-selected,
.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
  background-color: ${colorDark};
}
.ant-menu-dark .ant-menu-item-disabled,
.ant-menu-dark .ant-menu-submenu-disabled,
.ant-menu-dark .ant-menu-item-disabled > a,
.ant-menu-dark .ant-menu-submenu-disabled > a,
.ant-menu-dark .ant-menu-item-disabled > span > a,
.ant-menu-dark .ant-menu-submenu-disabled > span > a {
  color: rgba(255, 255, 255, 0.35) !important;
}

.ant-menu-dark .ant-menu-item-disabled > .ant-menu-submenu-title,
.ant-menu-dark .ant-menu-submenu-disabled > .ant-menu-submenu-title {
  color: rgba(255, 255, 255, 0.35) !important;
}
.ant-menu-dark .ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,
.ant-menu-dark .ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::before,
.ant-menu-dark .ant-menu-item-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after,
.ant-menu-dark .ant-menu-submenu-disabled > .ant-menu-submenu-title > .ant-menu-submenu-arrow::after {
  background: rgba(255, 255, 255, 0.35) !important;
}

.ant-menu-rtl.ant-menu-inline,
.ant-menu-rtl.ant-menu-vertical {
  border-left: 1px solid ${borderLight};;
}

.ant-tooltip {
  color: ${textPrimary};
}

.ant-tooltip-inner {
  color: ${bgLight};
  background-color: ${colorTrans75};
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.ant-tooltip-arrow-content {
  --antd-arrow-background-color: linear-gradient(to right bottom, rgba(0, 0, 0, 0.65), ${colorTrans75});
}

.ant-tooltip-blue .ant-tooltip-inner {
  background-color: ${colorDark};
}
.ant-tooltip-blue .ant-tooltip-arrow-content::before {
  background: ${colorDark};
}

.ant-picker-calendar {
  color: ${textPrimary};
  background: ${bgLight};
}

.ant-picker-calendar .ant-picker-panel {
  background: ${bgLight};
  border-top: 1px solid ${borderLight};;
}

.ant-picker-calendar-full .ant-picker-panel {
  background: ${bgLight};
}

.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell:hover .ant-picker-calendar-date {
  background: ${bgHighlight};
}

.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date,
.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date,
.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date-today,
.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date-today {
  background: #e6f7ff;
}
.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date .ant-picker-calendar-date-value,
.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date .ant-picker-calendar-date-value,
.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date-today .ant-picker-calendar-date-value,
.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date-today .ant-picker-calendar-date-value {
  color: ${colorDark};
}
.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date {
  border-top: 2px solid ${borderLight};;
}

.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-content {
  color: ${textPrimary};
}

.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today {
  border-color: ${colorDark};
}
.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today .ant-picker-calendar-date-value {
  color: ${textPrimary};
}

.ant-picker-status-error.ant-picker,
.ant-picker-status-error.ant-picker:not([disabled]):hover {
  background-color: ${bgLight};
  border-color: #ff4d4f;
}
.ant-picker-status-error.ant-picker-focused,
.ant-picker-status-error.ant-picker:focus {
  border-color: #ff7875;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}
.ant-picker-status-error.ant-picker .ant-picker-active-bar {
  background: #ff7875;
}
.ant-picker-status-warning.ant-picker,
.ant-picker-status-warning.ant-picker:not([disabled]):hover {
  background-color: ${bgLight};
  border-color: #faad14;
}
.ant-picker-status-warning.ant-picker-focused,
.ant-picker-status-warning.ant-picker:focus {
  border-color: #ffc53d;
  box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);
}
.ant-picker-status-warning.ant-picker .ant-picker-active-bar {
  background: #ffc53d;
}
.ant-picker {
  color: ${textPrimary};
  background: ${bgLight};
  border: 1px solid #d9d9d9;
}
.ant-picker:hover,
.ant-picker-focused {
  border-color: ${colorPrimary};
}
.ant-picker-focused {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.ant-picker.ant-picker-disabled {
  background: ${bgHighlight};
  border-color: #d9d9d9;
  cursor: not-allowed;
}
.ant-picker.ant-picker-disabled .ant-picker-suffix {
  color: ${colorTrans25});
}

.ant-picker-input > input {
  color: ${textPrimary};
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}
.ant-picker-input > input::-moz-placeholder {
  color: #bfbfbf;
}
.ant-picker-input > input:-ms-input-placeholder {
  color: #bfbfbf;
}
.ant-picker-input > input::placeholder {
  color: #bfbfbf;
}
.ant-picker-input > input:hover {
  border-color: ${colorPrimary};
}
.ant-picker-input > input:focus,
.ant-picker-input > input-focused {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.ant-picker-input > input-disabled {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}

.ant-picker-input > input-disabled:hover {
  border-color: #d9d9d9;
}
.ant-picker-input > input[disabled] {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}

.ant-picker-input > input[disabled]:hover {
  border-color: #d9d9d9;
}

.ant-picker-suffix {
  color: ${colorTrans25});
}

.ant-picker-clear {
  color: ${colorTrans25});
  background: ${bgLight};
}

.ant-picker-clear:hover {
  color: ${colorTrans45};
}
.ant-picker-separator {
  color: ${colorTrans25});
}
.ant-picker-focused .ant-picker-separator {
  color: ${colorTrans45};
}

.ant-picker-range .ant-picker-active-bar {
  background: ${colorDark};
}

.ant-picker-dropdown {
  color: ${textPrimary};
}

.ant-picker-ranges .ant-picker-preset > .ant-tag-blue {
  color: ${colorDark};
  background: #e6f7ff;
  border-color: #91d5ff;
}

.ant-picker-range-arrow::before {
  background: ${bgLight};
}
.ant-picker-panel-container {
  background: ${bgLight};
}

.ant-picker-panel-container .ant-picker-panel-focused {
  border-color: ${borderLight};;
}

.ant-picker-panel {
  background: ${bgLight};
  border: 1px solid ${borderLight};;
}
.ant-picker-panel-focused {
  border-color: ${colorDark};
}

.ant-picker-header {
  color: ${textPrimary};
  border-bottom: 1px solid ${borderLight};;
}

.ant-picker-header button {
  color: ${colorTrans25});
}

.ant-picker-header > button:hover {
  color: ${textPrimary};
}

.ant-picker-header-view button:not(:first-child) {
  margin-left: 8px;
}
.ant-picker-header-view button:hover {
  color: ${colorDark};
}
.ant-picker-content th {
  height: 30px;
  color: ${textPrimary};
  line-height: 30px;
}
.ant-picker-cell {
  padding: 3px 0;
  color: ${colorTrans25});
  cursor: pointer;
}
.ant-picker-cell-in-view {
  color: ${textPrimary};
}

.ant-picker-cell:hover:not(.ant-picker-cell-in-view) .ant-picker-cell-inner,
.ant-picker-cell:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end):not(.ant-picker-cell-range-hover-start):not(.ant-picker-cell-range-hover-end) .ant-picker-cell-inner {
  background: ${bgHighlight};
}

.ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before {
  border: 1px solid ${colorDark};
}

.ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner,
.ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner,
.ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner {
  color: ${bgLight};
  background: ${colorDark};
}

.ant-picker-cell-disabled {
  color: ${colorTrans25});
  pointer-events: none;
}

.ant-picker-cell-disabled::before {
  background: rgba(0, 0, 0, 0.04);
}
.ant-picker-cell-disabled.ant-picker-cell-today .ant-picker-cell-inner::before {
  border-color: ${colorTrans25});
}

.ant-picker-panel .ant-picker-footer {
  border-top: 1px solid ${borderLight};;
}

.ant-picker-footer-extra:not(:last-child) {
  border-bottom: 1px solid ${borderLight};;
}
.ant-picker-now {
  text-align: left;
}
.ant-picker-today-btn {
  color: ${colorDark};
}
.ant-picker-today-btn:hover {
  color: ${colorPrimary};
}
.ant-picker-today-btn:active {
  color: #096dd9;
}
.ant-picker-today-btn.ant-picker-today-btn-disabled {
  color: ${colorTrans25});
  cursor: not-allowed;
}

.ant-picker-week-panel-row:hover td {
  background: ${bgHighlight};
}
.ant-picker-week-panel-row-selected td,
.ant-picker-week-panel-row-selected:hover td {
  background: ${colorDark};
}
.ant-picker-week-panel-row-selected td.ant-picker-cell-week,
.ant-picker-week-panel-row-selected:hover td.ant-picker-cell-week {
  color: rgba(255, 255, 255, 0.5);
}
.ant-picker-week-panel-row-selected td.ant-picker-cell-today .ant-picker-cell-inner::before,
.ant-picker-week-panel-row-selected:hover td.ant-picker-cell-today .ant-picker-cell-inner::before {
  border-color: ${bgLight};
}
.ant-picker-week-panel-row-selected td .ant-picker-cell-inner,
.ant-picker-week-panel-row-selected:hover td .ant-picker-cell-inner {
  color: ${bgLight};
}

.ant-picker-datetime-panel {
  display: flex;
}
.ant-picker-datetime-panel .ant-picker-time-panel {
  border-left: 1px solid ${borderLight};;
}

.ant-picker-time-panel-column:not(:first-child) {
  border-left: 1px solid ${borderLight};;
}

.ant-picker-time-panel-column > li.ant-picker-time-panel-cell .ant-picker-time-panel-cell-inner {
  color: ${textPrimary};
}

.ant-picker-time-panel-column > li.ant-picker-time-panel-cell .ant-picker-time-panel-cell-inner:hover {
  background: ${bgHighlight};
}
.ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner {
  background: #e6f7ff;
}
.ant-picker-time-panel-column > li.ant-picker-time-panel-cell-disabled .ant-picker-time-panel-cell-inner {
  color: ${colorTrans25});
}

.ant-tag {
  color: ${textPrimary};
  background: ${bgElevated};
}

.ant-tag,
.ant-tag a,
.ant-tag a:hover {
  color: ${textPrimary};
}

.ant-tag-close-icon {
  color: ${colorTrans45};
}
.ant-tag-close-icon:hover {
  color: ${textPrimary};
}

.ant-tag-has-color,
.ant-tag-has-color a,
.ant-tag-has-color a:hover,
.ant-tag-has-color .anticon-close,
.ant-tag-has-color .anticon-close:hover {
  color: ${bgLight};
}

.ant-tag-checkable:not(.ant-tag-checkable-checked):hover {
  color: ${colorDark};
}
.ant-tag-checkable:active,
.ant-tag-checkable-checked {
  color: ${bgLight};
}
.ant-tag-checkable-checked {
  background-color: ${colorDark};
}
.ant-tag-checkable:active {
  background-color: #096dd9;
}

.ant-tag-pink {
  color: #c41d7f;
  background: #fff0f6;
  border-color: #ffadd2;
}
.ant-tag-pink-inverse {
  color: ${bgLight};
  background: #eb2f96;
  border-color: #eb2f96;
}
.ant-tag-magenta {
  color: #c41d7f;
  background: #fff0f6;
  border-color: #ffadd2;
}
.ant-tag-magenta-inverse {
  color: ${bgLight};
  background: #eb2f96;
  border-color: #eb2f96;
}
.ant-tag-red {
  color: #cf1322;
  background: #fff1f0;
  border-color: #ffa39e;
}
.ant-tag-red-inverse {
  color: ${bgLight};
  background: #f5222d;
  border-color: #f5222d;
}
.ant-tag-volcano {
  color: #d4380d;
  background: #fff2e8;
  border-color: #ffbb96;
}
.ant-tag-volcano-inverse {
  color: ${bgLight};
  background: #fa541c;
  border-color: #fa541c;
}
.ant-tag-orange {
  color: #d46b08;
  background: #fff7e6;
  border-color: #ffd591;
}
.ant-tag-orange-inverse {
  color: ${bgLight};
  background: #fa8c16;
  border-color: #fa8c16;
}
.ant-tag-yellow {
  color: #d4b106;
  background: #feffe6;
  border-color: ${bgLight}b8f;
}
.ant-tag-yellow-inverse {
  color: ${bgLight};
  background: #fadb14;
  border-color: #fadb14;
}
.ant-tag-gold {
  color: #d48806;
  background: #fffbe6;
  border-color: #ffe58f;
}
.ant-tag-gold-inverse {
  color: ${bgLight};
  background: #faad14;
  border-color: #faad14;
}
.ant-tag-cyan {
  color: #08979c;
  background: #e6fffb;
  border-color: #87e8de;
}
.ant-tag-cyan-inverse {
  color: ${bgLight};
  background: #13c2c2;
  border-color: #13c2c2;
}
.ant-tag-lime {
  color: #7cb305;
  background: #fcffe6;
  border-color: #eaff8f;
}
.ant-tag-lime-inverse {
  color: ${bgLight};
  background: #a0d911;
  border-color: #a0d911;
}
.ant-tag-green {
  color: #389e0d;
  background: #f6ffed;
  border-color: #b7eb8f;
}
.ant-tag-green-inverse {
  color: ${bgLight};
  background: #52c41a;
  border-color: #52c41a;
}
.ant-tag-blue {
  color: #096dd9;
  background: #e6f7ff;
  border-color: #91d5ff;
}
.ant-tag-blue-inverse {
  color: ${bgLight};
  background: ${colorDark};
  border-color: ${colorDark};
}
.ant-tag-geekblue {
  color: #1d39c4;
  background: #f0f5ff;
  border-color: #adc6ff;
}
.ant-tag-geekblue-inverse {
  color: ${bgLight};
  background: #2f54eb;
  border-color: #2f54eb;
}
.ant-tag-purple {
  color: #531dab;
  background: #f9f0ff;
  border-color: #d3adf7;
}
.ant-tag-purple-inverse {
  color: ${bgLight};
  background: #722ed1;
  border-color: #722ed1;
}
.ant-tag-success {
  color: #52c41a;
  background: #f6ffed;
  border-color: #b7eb8f;
}
.ant-tag-processing {
  color: ${colorDark};
  background: #e6f7ff;
  border-color: #91d5ff;
}
.ant-tag-error {
  color: #ff4d4f;
  background: #fff2f0;
  border-color: #ffccc7;
}
.ant-tag-warning {
  color: #faad14;
  background: #fffbe6;
  border-color: #ffe58f;
}
.ant-tag > .anticon + span,
.ant-tag > span + .anticon {
  margin-left: 7px;
}
.ant-tag.ant-tag-rtl {
  margin-right: 0;
  margin-left: 8px;
  direction: rtl;
  text-align: right;
}
.ant-tag-rtl .ant-tag-close-icon {
  margin-right: 3px;
  margin-left: 0;
}
.ant-tag-rtl.ant-tag > .anticon + span,
.ant-tag-rtl.ant-tag > span + .anticon {
  margin-right: 7px;
  margin-left: 0;
}

.ant-radio-group {
  color: ${textPrimary};
}

.ant-radio-wrapper {
  color: ${textPrimary};
}

.ant-radio {
  color: ${textPrimary};
}
.ant-radio-wrapper:hover .ant-radio,
.ant-radio:hover .ant-radio-inner,
.ant-radio-input:focus + .ant-radio-inner {
  border-color: ${colorDark};
}
.ant-radio-input:focus + .ant-radio-inner {
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.12);
}
.ant-radio-checked::after {
  border: 1px solid ${colorDark};
}

.ant-radio-inner {
  background-color: ${bgLight};
}
.ant-radio-inner::after {
  background-color: ${colorDark};
}

.ant-radio.ant-radio-disabled .ant-radio-inner {
  border-color: #d9d9d9;
}
.ant-radio-checked .ant-radio-inner {
  border-color: ${colorDark};
}

.ant-radio-disabled .ant-radio-inner {
  background-color: ${bgHighlight};
}
.ant-radio-disabled .ant-radio-inner::after {
  background-color: rgba(0, 0, 0, 0.2);
}

.ant-radio-disabled + span {
  color: ${colorTrans25});

}

.ant-radio-button-wrapper {
  color: ${textPrimary};
  background: ${bgLight};
  border: 1px solid #d9d9d9;
}
.ant-radio-button-wrapper a {
  color: ${textPrimary};
}
.ant-radio-button-wrapper:hover {
  position: relative;
  color: ${colorDark};
}
.ant-radio-button-wrapper:focus-within {
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.12);
}

.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  z-index: 1;
  color: ${colorDark};
  background: ${bgLight};
  border-color: ${colorDark};
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {
  background-color: ${colorDark};
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child {
  border-color: ${colorDark};
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
  color: ${colorPrimary};
  border-color: ${colorPrimary};
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover::before {
  background-color: ${colorPrimary};
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active {
  color: #096dd9;
  border-color: #096dd9;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active::before {
  background-color: #096dd9;
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within {
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.12);
}
.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  color: ${bgLight};
  background: ${colorDark};
  border-color: ${colorDark};
}
.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
  color: ${bgLight};
  background: ${colorPrimary};
  border-color: ${colorPrimary};
}
.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active {
  color: ${bgLight};
  background: #096dd9;
  border-color: #096dd9;
}
.ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within {
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.12);
}
.ant-radio-button-wrapper-disabled {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}
.ant-radio-button-wrapper-disabled:first-child,
.ant-radio-button-wrapper-disabled:hover {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}
.ant-radio-button-wrapper-disabled:first-child {
  border-left-color: #d9d9d9;
}
.ant-radio-button-wrapper-disabled.ant-radio-button-wrapper-checked {
  color: ${colorTrans25});
  background-color: #e6e6e6;
  border-color: #d9d9d9;
}

.ant-radio-button-wrapper.ant-radio-button-wrapper-rtl.ant-radio-button-wrapper:first-child {
  border-right: 1px solid #d9d9d9;
}
.ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child {
  border-right-color: ${colorPrimary};
}
.ant-radio-button-wrapper.ant-radio-button-wrapper-rtl.ant-radio-button-wrapper:last-child {
}
.ant-radio-button-wrapper.ant-radio-button-wrapper-rtl.ant-radio-button-wrapper-disabled:first-child {
  border-right-color: #d9d9d9;
}

.ant-card {
  color: ${textPrimary};
  background: ${bgLight};
}

.ant-card-bordered {
  border: 1px solid ${borderLight};;
}
.ant-card-head {
  color: ${textPrimary};
  border-bottom: 1px solid ${borderLight};;
}

.ant-card-head .ant-tabs-top {
  color: ${textPrimary};
}
.ant-card-head .ant-tabs-top-bar {
  border-bottom: 1px solid ${borderLight};;
}
.ant-card-extra {
  color: ${textPrimary};
}

.ant-card-grid {
  box-shadow: 1px 0 0 0 ${borderLight};, 0 1px 0 0 ${borderLight};, 1px 1px 0 0 ${borderLight};, 1px 0 0 0 ${borderLight}; inset, 0 1px 0 0 ${borderLight}; inset;
}
.ant-card-grid-hoverable:hover {
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
}

.ant-card-actions {
  background: ${bgLight};
  border-top: 1px solid ${borderLight};;
}

.ant-card-actions > li {
  color: ${colorTrans45};
}

.ant-card-actions > li > span:hover {
  color: ${colorDark};
}
.ant-card-actions > li > span a:not(.ant-btn),
.ant-card-actions > li > span > .anticon {

  color: ${colorTrans45};
}
.ant-card-actions > li > span a:not(.ant-btn):hover,
.ant-card-actions > li > span > .anticon:hover {
  color: ${colorDark};
}

.ant-card-actions > li:not(:last-child) {
  border-right: 1px solid ${borderLight};;
}
.ant-card-rtl .ant-card-actions > li:not(:last-child) {
  border-left: 1px solid ${borderLight};;
}
.ant-card-type-inner .ant-card-head {
  padding: 0 24px;
  background: ${bgElevated};
}

.ant-card-meta-title {
  color: ${textPrimary};
}
.ant-card-meta-description {
  color: ${colorTrans45};
}

.ant-tabs-top > .ant-tabs-nav::before,
.ant-tabs-bottom > .ant-tabs-nav::before,
.ant-tabs-top > div > .ant-tabs-nav::before,
.ant-tabs-bottom > div > .ant-tabs-nav::before {
  border-bottom: 1px solid ${borderLight};;
}

.ant-tabs-left > .ant-tabs-content-holder,
.ant-tabs-left > div > .ant-tabs-content-holder {
  border-left: 1px solid ${borderLight};;
}

.ant-tabs-right > .ant-tabs-content-holder,
.ant-tabs-right > div > .ant-tabs-content-holder {
  border-right: 1px solid ${borderLight};;
}
.ant-tabs-dropdown {
  color: ${textPrimary};
}
.ant-tabs-dropdown-menu {
  background-color: ${bgLight};
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
.ant-tabs-dropdown-menu-item {
  color: ${textPrimary};
}
.ant-tabs-dropdown-menu-item-remove {
  color: ${colorTrans45};
}
.ant-tabs-dropdown-menu-item-remove:hover {
  color: ${colorPrimary};
}
.ant-tabs-dropdown-menu-item:hover {
  background: ${bgHighlight};
}
.ant-tabs-dropdown-menu-item-disabled,
.ant-tabs-dropdown-menu-item-disabled:hover {
  color: ${colorTrans25});
}
.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab,
.ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab {
  background: ${bgElevated};
  border: 1px solid ${borderLight};;
}
.ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active,
.ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active {
  color: ${colorDark};
  background: ${bgLight};
}
.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active,
.ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab-active {
  border-bottom-color: ${bgLight};
}
.ant-tabs-card.ant-tabs-bottom > .ant-tabs-nav .ant-tabs-tab-active,
.ant-tabs-card.ant-tabs-bottom > div > .ant-tabs-nav .ant-tabs-tab-active {
  border-top-color: ${bgLight};
}
.ant-tabs-card.ant-tabs-left > .ant-tabs-nav .ant-tabs-tab-active,
.ant-tabs-card.ant-tabs-left > div > .ant-tabs-nav .ant-tabs-tab-active {
  border-right-color: ${bgLight};
}
.ant-tabs-card.ant-tabs-right > .ant-tabs-nav .ant-tabs-tab-active,
.ant-tabs-card.ant-tabs-right > div > .ant-tabs-nav .ant-tabs-tab-active {
  border-left-color: ${bgLight};
}
.ant-tabs {
  color: ${textPrimary};
}

.ant-tabs > .ant-tabs-nav .ant-tabs-nav-add,
.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-add {
  background: ${bgElevated};
  border: 1px solid ${borderLight};;
}
.ant-tabs > .ant-tabs-nav .ant-tabs-nav-add:hover,
.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-add:hover {
  color: ${colorPrimary};
}
.ant-tabs > .ant-tabs-nav .ant-tabs-nav-add:active,
.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-add:active,
.ant-tabs > .ant-tabs-nav .ant-tabs-nav-add:focus,
.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-add:focus {
  color: #096dd9;
}

.ant-tabs-ink-bar {
  position: absolute;
  background: ${colorDark};
  pointer-events: none;
}

.ant-tabs-tab-remove {
  color: ${colorTrans45};
}
.ant-tabs-tab-remove:hover {
  color: ${textPrimary};
}
.ant-tabs-tab:hover {
  color: ${colorPrimary};
}
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: ${colorDark};
}
.ant-tabs-tab.ant-tabs-tab-disabled {
  color: ${colorTrans25});
  cursor: not-allowed;
}
.ant-tabs-tab.ant-tabs-tab-disabled .ant-tabs-tab-btn:focus,
.ant-tabs-tab.ant-tabs-tab-disabled .ant-tabs-tab-remove:focus,
.ant-tabs-tab.ant-tabs-tab-disabled .ant-tabs-tab-btn:active,
.ant-tabs-tab.ant-tabs-tab-disabled .ant-tabs-tab-remove:active {
  color: ${colorTrans25});
}

.ant-tabs-content-holder {
  background-color: ${bgLight};
}

.ant-carousel {
  color: ${textPrimary};
}

.ant-carousel .slick-dots li button {
  background: ${bgLight};
}

.ant-carousel .slick-dots li.slick-active button {
  background: ${bgLight};
}

.ant-cascader-checkbox {
  color: ${textPrimary};
}

.ant-cascader-checkbox-wrapper:hover .ant-cascader-checkbox-inner,
.ant-cascader-checkbox:hover .ant-cascader-checkbox-inner,
.ant-cascader-checkbox-input:focus + .ant-cascader-checkbox-inner {
  border-color: ${colorDark};
}
.ant-cascader-checkbox-checked::after {
  border: 1px solid ${colorDark};
}

.ant-cascader-checkbox-inner {
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}

.ant-cascader-checkbox-inner::after {
  border: 2px solid ${bgLight};
}

.ant-cascader-checkbox-checked .ant-cascader-checkbox-inner::after {
  border: 2px solid ${bgLight};
}
.ant-cascader-checkbox-checked .ant-cascader-checkbox-inner {
  background-color: ${colorDark};
  border-color: ${colorDark};
}

.ant-cascader-checkbox-disabled.ant-cascader-checkbox-checked .ant-cascader-checkbox-inner::after {
  border-color: ${colorTrans25});

}

.ant-cascader-checkbox-disabled .ant-cascader-checkbox-inner {
  background-color: ${bgHighlight};
  border-color: #d9d9d9 !important;
}
.ant-cascader-checkbox-disabled .ant-cascader-checkbox-inner::after {
  border-color: ${bgHighlight};
}
.ant-cascader-checkbox-disabled + span {
  color: ${colorTrans25});
  cursor: not-allowed;
}

.ant-cascader-checkbox-wrapper {
  color: ${textPrimary};
}

.ant-cascader-checkbox-group {
  color: ${textPrimary};
}

.ant-cascader-checkbox-indeterminate .ant-cascader-checkbox-inner {
  background-color: ${bgLight};
  border-color: #d9d9d9;
}
.ant-cascader-checkbox-indeterminate .ant-cascader-checkbox-inner::after {
  background-color: ${colorDark};
}
.ant-cascader-checkbox-indeterminate.ant-cascader-checkbox-disabled .ant-cascader-checkbox-inner::after {
  background-color: ${colorTrans25});
  border-color: ${colorTrans25});
}

.ant-cascader-menu {
  border-right: 1px solid ${borderLight};;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.ant-cascader-menu-item:hover {
  background: ${bgHighlight};
}
.ant-cascader-menu-item-disabled {
  color: ${colorTrans25});
}

.ant-cascader-menu-empty .ant-cascader-menu-item {
  color: ${colorTrans25});
}
.ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled),
.ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover {
  background-color: #e6f7ff;
}

.ant-cascader-menu-item-expand .ant-cascader-menu-item-expand-icon,
.ant-cascader-menu-item-loading-icon {
  color: ${colorTrans45};
}
.ant-cascader-menu-item-disabled.ant-cascader-menu-item-expand .ant-cascader-menu-item-expand-icon,
.ant-cascader-menu-item-disabled.ant-cascader-menu-item-loading-icon {
  color: ${colorTrans25});
}
.ant-cascader-menu-item-keyword {
  color: #ff4d4f;
}

.ant-checkbox {
  color: ${textPrimary};
}
.ant-checkbox-wrapper:hover .ant-checkbox-inner,
.ant-checkbox:hover .ant-checkbox-inner,
.ant-checkbox-input:focus + .ant-checkbox-inner {
  border-color: ${colorDark};
}
.ant-checkbox-checked::after {
  border: 1px solid ${colorDark};
}

.ant-checkbox-inner {
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}
.ant-checkbox-inner::after {
  border: 2px solid ${bgLight};
}

.ant-checkbox-checked .ant-checkbox-inner::after {
  border: 2px solid ${bgLight};
}
.ant-checkbox-checked .ant-checkbox-inner {
  background-color: ${colorDark};
  border-color: ${colorDark};
}

.ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner::after {
  border-color: ${colorTrans25});
}

.ant-checkbox-disabled .ant-checkbox-inner {
  background-color: ${bgHighlight};
  border-color: #d9d9d9 !important;
}
.ant-checkbox-disabled .ant-checkbox-inner::after {
  border-color: ${bgHighlight};
}
.ant-checkbox-disabled + span {
  color: ${colorTrans25});
  cursor: not-allowed;
}

.ant-checkbox-wrapper {
  color: ${textPrimary};
}

.ant-checkbox-group {
  color: ${textPrimary};
}

.ant-checkbox-indeterminate .ant-checkbox-inner {
  background-color: ${bgLight};
  border-color: #d9d9d9;
}
.ant-checkbox-indeterminate .ant-checkbox-inner::after {
  background-color: ${colorDark};
}

.ant-checkbox-indeterminate.ant-checkbox-disabled .ant-checkbox-inner::after {
  background-color: ${colorTrans25});
  border-color: ${colorTrans25});
}

.ant-input-number-handler {
  color: ${colorTrans45};
}

.ant-input-number-handler:active {
  background: #f4f4f4;
}
.ant-input-number-handler:hover .ant-input-number-handler-up-inner,
.ant-input-number-handler:hover .ant-input-number-handler-down-inner {
  color: ${colorPrimary};
}
.ant-input-number-handler-up-inner,
.ant-input-number-handler-down-inner {
  color: ${colorTrans45};
}

.ant-input-number:hover {
  border-color: ${colorPrimary};
}

.ant-input-number-focused {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.ant-input-number-disabled {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}

.ant-input-number-handler-wrap {
  background: ${bgLight};
}

.ant-input-number-handler-up-disabled:hover .ant-input-number-handler-up-inner,
.ant-input-number-handler-down-disabled:hover .ant-input-number-handler-down-inner {
  color: ${colorTrans25});
}

.ant-input-number-out-of-range input {
  color: #ff4d4f;
}

.ant-input-affix-wrapper {
  color: ${textPrimary};
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}

.ant-input-affix-wrapper:hover {
  border-color: ${colorPrimary};
  border-right-width: 1px;
}

.ant-input-affix-wrapper:focus,
.ant-input-affix-wrapper-focused {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.ant-input-affix-wrapper-disabled {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}
.ant-input-affix-wrapper-disabled:hover {
  border-color: #d9d9d9;
}
.ant-input-affix-wrapper[disabled] {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}

.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
  border-color: ${colorPrimary};
}

.ant-input-show-count-suffix {
  color: ${colorTrans45};
}

.anticon.ant-input-clear-icon,
.ant-input-clear-icon {
  color: ${colorTrans25});
}
.anticon.ant-input-clear-icon:hover,
.ant-input-clear-icon:hover {
  color: ${colorTrans45};
}
.anticon.ant-input-clear-icon:active,
.ant-input-clear-icon:active {
  color: ${textPrimary};
}

.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover {
  background: ${bgLight};
  border-color: #ff4d4f;
}
.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:focus,
.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input-focused {
  border-color: #ff7875;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}
.ant-input-status-error .ant-input-prefix {
  color: #ff4d4f;
}
.ant-input-status-warning:not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
.ant-input-status-warning:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover {
  background: ${bgLight};
  border-color: #faad14;
}
.ant-input-status-warning:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:focus,
.ant-input-status-warning:not(.ant-input-disabled):not(.ant-input-borderless).ant-input-focused {
  border-color: #ffc53d;
  box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);
.ant-input-status-warning .ant-input-prefix {
  color: #faad14;
}
.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
  background: ${bgLight};
  border-color: #ff4d4f;
}
.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:focus,
.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper-focused {
  border-color: #ff7875;
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}
.ant-input-affix-wrapper-status-error .ant-input-prefix {
  color: #ff4d4f;
}
.ant-input-affix-wrapper-status-warning:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
.ant-input-affix-wrapper-status-warning:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
  background: ${bgLight};
  border-color: #faad14;
}
.ant-input-affix-wrapper-status-warning:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:focus,
.ant-input-affix-wrapper-status-warning:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper-focused {
  border-color: #ffc53d;
  box-shadow: 0 0 0 2px rgba(250, 173, 20, 0.2);
}
.ant-input-group-wrapper-status-error .ant-input-group-addon {
  color: #ff4d4f;
  border-color: #ff4d4f;
}
.ant-input-group-wrapper-status-warning .ant-input-group-addon {
  color: #faad14;
  border-color: #faad14;
}
.ant-input {
  color: ${textPrimary};
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}
.ant-input::-moz-placeholder {
  color: #bfbfbf;
}
.ant-input:-ms-input-placeholder {
  color: #bfbfbf;
}
.ant-input::placeholder {
  color: #bfbfbf;
}

.ant-input:hover {
  border-color: ${colorPrimary};
}

.ant-input:focus,
.ant-input-focused {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.ant-input-disabled {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}
.ant-input-disabled:hover {
  border-color: #d9d9d9;
}
.ant-input[disabled] {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}
.ant-input[disabled]:hover {
  border-color: #d9d9d9;
}

.ant-input-group {
  color: ${textPrimary};
}

.ant-input-group-addon {

  color: ${textPrimary};
  background: ${bgElevated};
  border: 1px solid #d9d9d9;
}
.ant-input-group-addon .ant-select-open .ant-select-selector,
.ant-input-group-addon .ant-select-focused .ant-select-selector {
  color: ${colorDark};
}

.ant-input-password-icon.anticon {
  color: ${colorTrans45};
}
.ant-input-password-icon.anticon:hover {
  color: ${textPrimary};
}

.ant-input-textarea-show-count::after {
  color: ${colorTrans45};
}

.ant-input-search .ant-input:hover,
.ant-input-search .ant-input:focus {
  border-color: ${colorPrimary};
}
.ant-input-search .ant-input:hover + .ant-input-group-addon .ant-input-search-button:not(.ant-btn-primary),
.ant-input-search .ant-input:focus + .ant-input-group-addon .ant-input-search-button:not(.ant-btn-primary) {
  border-left-color: ${colorPrimary};
}
.ant-input-search > .ant-input-group > .ant-input-group-addon:last-child .ant-input-search-button:not(.ant-btn-primary) {
  color: ${colorTrans45};
}

.ant-input-search-rtl .ant-input:hover + .ant-input-group-addon .ant-input-search-button:not(.ant-btn-primary):hover,
.ant-input-search-rtl .ant-input:focus + .ant-input-group-addon .ant-input-search-button:not(.ant-btn-primary):hover {
  border-left-color: ${colorPrimary};
}
.ant-input-search-rtl > .ant-input-group > .ant-input-affix-wrapper:hover,
.ant-input-search-rtl > .ant-input-group > .ant-input-affix-wrapper-focused {
  border-right-color: ${colorPrimary};
}

.ant-layout-sider-trigger {
  position: fixed;
  color: ${bgLight};
  background: #002140;
}
.ant-layout-sider-zero-width > * {
  overflow: hidden;
}
.ant-layout-sider-zero-width-trigger {
  color: ${bgLight};
  background: #001529;
}

.ant-layout-sider-light {
  background: ${bgLight};
}
.ant-layout-sider-light .ant-layout-sider-trigger {
  color: ${textPrimary};
  background: ${bgLight};
}
.ant-layout-sider-light .ant-layout-sider-zero-width-trigger {
  color: ${textPrimary};
  background: ${bgLight};
}
.ant-list {
  color: ${textPrimary};
}

.ant-list-empty-text {
  color: ${colorTrans25});
}

.ant-list-item {
  color: ${textPrimary};
}

.ant-list-item-meta-content {
  color: ${textPrimary};
}
.ant-list-item-meta-title {
  color: ${textPrimary};
}
.ant-list-item-meta-title > a {
  color: ${textPrimary};
  transition: all 0.3s;
}
.ant-list-item-meta-title > a:hover {
  color: ${colorDark};
}
.ant-list-item-meta-description {
  color: ${colorTrans45};
}

.ant-list-item-action > li {
  color: ${colorTrans45};
}

.ant-list-item-action-split {

  background-color: ${borderLight};;
}

.ant-list-empty {
  color: ${colorTrans45};
}
.ant-list-split .ant-list-item {
  border-bottom: 1px solid ${borderLight};;
}

.ant-list-split .ant-list-header {
  border-bottom: 1px solid ${borderLight};;
}
.ant-list-split.ant-list-empty .ant-list-footer {
  border-top: 1px solid ${borderLight};;
}

.ant-list-split.ant-list-something-after-last-item .ant-spin-container > .ant-list-items > .ant-list-item:last-child {
  border-bottom: 1px solid ${borderLight};;
}

.ant-list-vertical .ant-list-item-meta-title {
  color: ${textPrimary};
}

.ant-pagination {
  color: ${textPrimary};
}

.ant-pagination-item {

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}
.ant-pagination-item a {
  color: ${textPrimary};
}

.ant-pagination-item:hover {
  border-color: ${colorDark};

}
.ant-pagination-item:hover a {
  color: ${colorDark};
}
.ant-pagination-item:focus-visible {
  border-color: ${colorDark};

}
.ant-pagination-item:focus-visible a {
  color: ${colorDark};
}
.ant-pagination-item-active {
  background: ${bgLight};
  border-color: ${colorDark};
}
.ant-pagination-item-active a {
  color: ${colorDark};
}
.ant-pagination-item-active:hover {
  border-color: ${colorPrimary};
}
.ant-pagination-item-active:focus-visible {
  border-color: ${colorPrimary};
}
.ant-pagination-item-active:hover a {
  color: ${colorPrimary};
}
.ant-pagination-item-active:focus-visible a {
  color: ${colorPrimary};
}

.ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon,
.ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
  color: ${colorDark};
}

.ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis,
.ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis {
  color: ${colorTrans25});
}

.ant-pagination-prev,
.ant-pagination-next,
.ant-pagination-jump-prev,
.ant-pagination-jump-next {
  color: ${textPrimary};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}
.ant-pagination-prev,
.ant-pagination-next {
  font-family: Arial, Helvetica, sans-serif;
}
.ant-pagination-prev button,
.ant-pagination-next button {
  color: ${textPrimary};
}
.ant-pagination-prev:hover button,
.ant-pagination-next:hover button {
  border-color: ${colorPrimary};
}
.ant-pagination-prev .ant-pagination-item-link,
.ant-pagination-next .ant-pagination-item-link {
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}
.ant-pagination-prev:focus-visible .ant-pagination-item-link,
.ant-pagination-next:focus-visible .ant-pagination-item-link {
  color: ${colorDark};
  border-color: ${colorDark};
}
.ant-pagination-prev:hover .ant-pagination-item-link,
.ant-pagination-next:hover .ant-pagination-item-link {
  color: ${colorDark};
  border-color: ${colorDark};
}

.ant-pagination-disabled .ant-pagination-item-link,
.ant-pagination-disabled:hover .ant-pagination-item-link {
  color: ${colorTrans25});
  border-color: #d9d9d9;
}

.ant-pagination-disabled:focus-visible .ant-pagination-item-link {
  color: ${colorTrans25});
  border-color: #d9d9d9;
  cursor: not-allowed;
}

.ant-pagination-options-quick-jumper input {
  color: ${textPrimary};
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}

.ant-pagination-options-quick-jumper input:hover {
  border-color: ${colorPrimary};
  border-right-width: 1px;
}
.ant-pagination-options-quick-jumper input:focus,
.ant-pagination-options-quick-jumper input-focused {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.ant-pagination-options-quick-jumper input-disabled {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}
.ant-pagination-options-quick-jumper input-disabled:hover {
  border-color: #d9d9d9;
}
.ant-pagination-options-quick-jumper input[disabled] {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}

.ant-pagination-simple .ant-pagination-simple-pager input {
  background-color: ${bgLight};
}
.ant-pagination-simple .ant-pagination-simple-pager input:hover {
  border-color: ${colorDark};
}
.ant-pagination-simple .ant-pagination-simple-pager input:focus {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.ant-pagination-simple .ant-pagination-simple-pager input[disabled] {
  color: ${colorTrans25});
  background: ${bgHighlight};
  border-color: #d9d9d9;
}

.ant-pagination.ant-pagination-disabled .ant-pagination-item {
  background: ${bgHighlight};
  border-color: #d9d9d9;
}
.ant-pagination.ant-pagination-disabled .ant-pagination-item a {
  color: ${colorTrans25});
}
.ant-pagination.ant-pagination-disabled .ant-pagination-item-active {
  background: #e6e6e6;
}
.ant-pagination.ant-pagination-disabled .ant-pagination-item-active a {
  color: ${colorTrans25});
}
.ant-pagination.ant-pagination-disabled .ant-pagination-item-link {
  color: ${colorTrans25});
  background: ${bgHighlight};
  border-color: #d9d9d9;
}

.ant-pagination.ant-pagination-disabled .ant-pagination-simple-pager {
  color: ${colorTrans25});
}

.ant-spin {
  color: ${textPrimary};
  color: ${colorDark};
}

.ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
  text-shadow: 0 1px 2px ${bgLight};
}

.ant-spin-container::after {
  background: ${bgLight};
}
.ant-spin-tip {
  color: ${colorTrans45};
}

.ant-spin-dot-item {
  background-color: ${colorDark};
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  /* IE10+ */
  .ant-spin-blur {
    background: ${bgLight};
  }
}

.ant-mentions-status-error:not(.ant-mentions-disabled):not(.ant-mentions-borderless).ant-mentions,
.ant-mentions-status-error:not(.ant-mentions-disabled):not(.ant-mentions-borderless).ant-mentions:hover {
  background: ${bgLight};
  border-color: #ff4d4f;
}

.ant-mentions-status-warning:not(.ant-mentions-disabled):not(.ant-mentions-borderless).ant-mentions,
.ant-mentions-status-warning:not(.ant-mentions-disabled):not(.ant-mentions-borderless).ant-mentions:hover {
  background: ${bgLight};
  border-color: #faad14;
}

.ant-mentions-status-warning .ant-input-prefix {
  color: #faad14;
}

.ant-mentions {
  color: ${textPrimary};
  background-color: ${bgLight};
}

.ant-mentions:hover {
  border-color: ${colorPrimary};
}
.ant-mentions:focus,
.ant-mentions-focused {
  border-color: ${colorPrimary};
}
.ant-mentions-disabled {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
}

.ant-mentions[disabled] {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}

.ant-mentions-disabled > textarea {
  color: ${colorTrans25});
  background-color: ${bgHighlight};
  border-color: #d9d9d9;
}
.ant-mentions-disabled > textarea:hover {
  border-color: #d9d9d9;
}
.ant-mentions-focused {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.ant-mentions-dropdown {
  color: ${textPrimary};
  background-color: ${bgLight};
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.ant-mentions-dropdown-menu-item {
  color: ${textPrimary};
}
.ant-mentions-dropdown-menu-item:hover {
  background-color: ${bgHighlight};
}

.ant-mentions-dropdown-menu-item-disabled {
  color: ${colorTrans25});
}
.ant-mentions-dropdown-menu-item-disabled:hover {
  color: ${colorTrans25});
  background-color: ${bgLight};
}
.ant-mentions-dropdown-menu-item-selected {
  color: ${textPrimary};
  background: ${bgElevated};
}
.ant-mentions-dropdown-menu-item-active {
  background-color: ${bgHighlight};
}

.ant-message {
  color: ${textPrimary};
}

.ant-message-notice-content {
  background: ${bgLight};
}

.ant-message-success .anticon {
  color: #52c41a;
}
.ant-message-error .anticon {
  color: #ff4d4f;
}
.ant-message-warning .anticon {
  color: #faad14;
}
.ant-message-info .anticon,
.ant-message-loading .anticon {
  color: ${colorDark};
}

.ant-modal {
  color: ${textPrimary};
}

.ant-modal-mask {
  background-color: ${colorTrans45};
}

.ant-modal-title {
  color: ${textPrimary};
}

.ant-modal-content {
  background-color: ${bgLight};
}

.ant-modal-close {
  color: ${colorTrans45};
}
.ant-modal-close:focus,
.ant-modal-close:hover {
  color: ${colorTrans75};
}
.ant-modal-header {
  padding: 16px 24px;
  color: ${textPrimary};
  background: ${bgLight};
  border-bottom: 1px solid ${borderLight};;
}

.ant-modal-footer {
  border-top: 1px solid ${borderLight};;
}

.ant-modal-confirm-body .ant-modal-confirm-title {
  color: ${textPrimary};
}
.ant-modal-confirm-body .ant-modal-confirm-content {
  color: ${textPrimary};
}

.ant-modal-confirm-error .ant-modal-confirm-body > .anticon {
  color: #ff4d4f;
}
.ant-modal-confirm-warning .ant-modal-confirm-body > .anticon,
.ant-modal-confirm-confirm .ant-modal-confirm-body > .anticon {
  color: #faad14;
}
.ant-modal-confirm-info .ant-modal-confirm-body > .anticon {
  color: ${colorDark};
}

.ant-notification {
  color: ${textPrimary};
}

.ant-notification-notice {
  background: ${bgLight};
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.ant-notification-notice-message {
  color: ${textPrimary};
}

.anticon.ant-notification-notice-icon-success {
  color: #52c41a;
}
.anticon.ant-notification-notice-icon-info {
  color: ${colorDark};
}
.anticon.ant-notification-notice-icon-warning {
  color: #faad14;
}
.anticon.ant-notification-notice-icon-error {
  color: #ff4d4f;
}
.ant-notification-notice-close {
  color: ${colorTrans45};
}

.ant-page-header {
  color: ${textPrimary};
  background-color: ${bgLight};
}
.ant-page-header-back-button {
  color: ${colorDark};
  color: #000;
}
.ant-page-header-back-button:focus-visible,
.ant-page-header-back-button:hover {
  color: ${colorPrimary};
}
.ant-page-header-back-button:active {
  color: #096dd9;
}

.ant-page-header-heading-title {
  color: ${textPrimary};
}

.ant-page-header-heading-sub-title {
  color: ${colorTrans45};
}

.ant-progress {
  color: ${textPrimary};
}

.ant-progress-steps-item-active {
  background: ${colorDark};
}

.ant-progress-inner {
  background-color: ${bgHighlight};
}
.ant-progress-circle-trail {
  stroke: ${bgHighlight};
}

.ant-progress-inner:not(.ant-progress-circle-gradient) .ant-progress-circle-path {
  stroke: ${colorDark};
}
.ant-progress-success-bg,
.ant-progress-bg {
  background-color: ${colorDark};
}
.ant-progress-success-bg {

  background-color: #52c41a;
}
.ant-progress-text {
  color: ${textPrimary};
}

.ant-progress-status-active .ant-progress-bg::before {
  background: ${bgLight};

}

.ant-progress-circle .ant-progress-text {
  color: ${textPrimary};
}

.ant-rate {
  color: ${textPrimary};
}

.ant-rate-star-first,
.ant-rate-star-second {
  color: ${borderLight};;
}

.ant-result-info .ant-result-icon > .anticon {
  color: ${colorDark};
}
.ant-result-warning .ant-result-icon > .anticon {
  color: #faad14;
}

.ant-result-title {
  color: ${textPrimary};
}
.ant-result-subtitle {
  color: ${colorTrans45};
}

.ant-result-content {
  background: ${bgElevated};
}

.segmented-disabled-item,
.segmented-disabled-item:hover,
.segmented-disabled-item:focus {
  color: ${colorTrans25});
}
.segmented-item-selected {
  background-color: ${bgLight};
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.07), 0 0 1px 0 rgba(0, 0, 0, 0.08);
}

.ant-segmented {
  color: ${textPrimary};
  background-color: ${bgBase};
}

.ant-segmented-item-selected {
  background-color: ${bgLight};
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.07), 0 0 1px 0 rgba(0, 0, 0, 0.08);
  color: #262626;
}

.ant-segmented-item-disabled,
.ant-segmented-item-disabled:hover,
.ant-segmented-item-disabled:focus {
  color: ${colorTrans25});
}
.ant-segmented-thumb {
  background-color: ${bgLight};
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.07), 0 0 1px 0 rgba(0, 0, 0, 0.08);
}
.ant-slider {
  color: ${textPrimary};
}

.ant-slider-rail {
  background-color: ${bgHighlight};
}
.ant-slider-track {
  background-color: #91d5ff;
}
.ant-slider-handle {
  background-color: ${bgLight};
  border: solid 2px #91d5ff;
}

.ant-slider-handle:focus {
  border-color: #46a6ff;
  box-shadow: 0 0 0 5px rgba(24, 144, 255, 0.12);
}
.ant-slider-handle.ant-tooltip-open {
  border-color: ${colorDark};
}
.ant-slider:hover .ant-slider-rail {
  background-color: #e1e1e1;
}
.ant-slider:hover .ant-slider-track {
  background-color: #69c0ff;
}
.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
  border-color: #69c0ff;
}

.ant-slider-mark-text {

  color: ${colorTrans45};
}
.ant-slider-mark-text-active {
  color: ${textPrimary};
}

.ant-slider-dot {
  background-color: ${bgLight};
  border: 2px solid ${borderLight};;
}
.ant-slider-dot-active {
  border-color: #8cc8ff;
}
.ant-slider-disabled {
  cursor: not-allowed;
}
.ant-slider-disabled .ant-slider-rail {
  background-color: ${bgHighlight} !important;
}
.ant-slider-disabled .ant-slider-track {
  background-color: ${colorTrans25}) !important;
}
.ant-slider-disabled .ant-slider-handle,
.ant-slider-disabled .ant-slider-dot {
  background-color: ${bgLight};
  border-color: ${colorTrans25}) !important;
}

.ant-statistic {
  color: ${textPrimary};
}
.ant-statistic-title {
  color: ${colorTrans45};
}

.ant-statistic-content {
  color: ${textPrimary};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

.ant-steps {
  color: ${textPrimary};
}
.ant-steps-item-icon {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  border: 1px solid ${colorTrans25});
}
.ant-steps-item-icon .ant-steps-icon {
  color: ${colorDark};
}

.ant-steps-item-tail::after {
  background: ${borderLight};;
}
.ant-steps-item-title {
  color: ${textPrimary};
}
.ant-steps-item-title::after {
  background: ${borderLight};;
}
.ant-steps-item-subtitle {
  color: ${colorTrans45};
}
.ant-steps-item-description {
  color: ${colorTrans45};
}
.ant-steps-item-wait .ant-steps-item-icon {
  background-color: ${bgLight};
  border-color: ${colorTrans25});
}
.ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
  color: ${colorTrans25});
}
.ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
  background: ${colorTrans25});
}
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
  color: ${colorTrans45};
}
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
  background-color: ${borderLight};;
}
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {
  color: ${colorTrans45};
}
.ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-tail::after {
  background-color: ${borderLight};;
}
.ant-steps-item-process .ant-steps-item-icon {
  background-color: ${bgLight};
  border-color: ${colorDark};
}
.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
  color: ${colorDark};
}
.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
  background: ${colorDark};
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
  color: ${textPrimary};
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
  background-color: ${borderLight};;
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {
  color: ${textPrimary};
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after {
  background-color: ${borderLight};;
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
  background: ${colorDark};
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon .ant-steps-icon {
  color: ${bgLight};
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-title {
  font-weight: 500;
}
.ant-steps-item-finish .ant-steps-item-icon {
  background-color: ${bgLight};
  border-color: ${colorDark};
}
.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
  color: ${colorDark};
}
.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
  background: ${colorDark};
}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
  color: ${textPrimary};
}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
  background-color: ${colorDark};
}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {
  color: ${colorTrans45};
}
.ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
  background-color: ${colorDark};
}
.ant-steps-item-error .ant-steps-item-icon {
  background-color: ${bgLight};
  border-color: #ff4d4f;
}
.ant-steps-item-error .ant-steps-item-icon > .ant-steps-icon {
  color: #ff4d4f;
}
.ant-steps-item-error .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
  background: #ff4d4f;
}
.ant-steps-item-error > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
  color: #ff4d4f;
}
.ant-steps-item-error > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
  background-color: ${borderLight};;
}
.ant-steps-item-error > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-description {
  color: #ff4d4f;
}
.ant-steps-item-error > .ant-steps-item-container > .ant-steps-item-tail::after {
  background-color: ${borderLight};;
}
.ant-steps-item.ant-steps-next-error .ant-steps-item-title::after {
  background: #ff4d4f;
}

.ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-title,
.ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-subtitle,
.ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-description {
  color: ${colorDark};
}
.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon {
  border-color: ${colorDark};
}
.ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon .ant-steps-icon {
  color: ${colorDark};
}

.ant-steps-item-custom.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
  color: ${colorDark};
}

.ant-steps-small .ant-steps-item-description {
  color: ${colorTrans45};
  font-size: 14px;
}

.ant-steps-navigation .ant-steps-item::after {
  border: 1px solid ${colorTrans25});
}

.ant-steps-navigation .ant-steps-item::before {
  background-color: ${colorDark};
}

.ant-switch {
  color: ${textPrimary};
  background-color: ${colorTrans25});
}
.ant-switch:focus {
  outline: 0;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}
.ant-switch-checked:focus {
  box-shadow: 0 0 0 2px #e6f7ff;
}

.ant-switch-checked {
  background-color: ${colorDark};
}


.ant-switch-inner {
  color: ${bgLight};
}

.ant-switch-handle::before {
  background-color: ${bgLight};
}

.ant-switch-loading-icon.anticon {
  color: rgba(0, 0, 0, 0.65);
}
.ant-switch-checked .ant-switch-loading-icon {
  color: ${colorDark};
}

.ant-table.ant-table-bordered > .ant-table-title {
  border: 1px solid ${borderLight};;
  border-bottom: 0;
}
.ant-table.ant-table-bordered > .ant-table-container {
  border-left: 1px solid ${borderLight};;
}
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > thead > tr > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > thead > tr > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > thead > tr > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > thead > tr > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tbody > tr > td,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tbody > tr > td,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tbody > tr > td,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tfoot > tr > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tfoot > tr > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tfoot > tr > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tfoot > tr > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tfoot > tr > td,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tfoot > tr > td,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tfoot > tr > td,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tfoot > tr > td {
  border-right: 1px solid ${borderLight};;
}
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > thead > tr:not(:last-child) > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > thead > tr:not(:last-child) > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > thead > tr:not(:last-child) > th,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > thead > tr:not(:last-child) > th {
  border-bottom: 1px solid ${borderLight};;
}
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > thead > tr > th::before,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > thead > tr > th::before,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > thead > tr > th::before,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > thead > tr > th::before {
  background-color: transparent !important;
}
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > thead > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > thead > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > thead > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > thead > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tbody > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tbody > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tbody > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tfoot > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tfoot > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tfoot > tr > .ant-table-cell-fix-right-first::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tfoot > tr > .ant-table-cell-fix-right-first::after {
  border-right: 1px solid ${borderLight};;
}
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tbody > tr > td > .ant-table-expanded-row-fixed,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tbody > tr > td > .ant-table-expanded-row-fixed,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td > .ant-table-expanded-row-fixed,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tbody > tr > td > .ant-table-expanded-row-fixed {
  margin: -16px -17px;
}
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table > tbody > tr > td > .ant-table-expanded-row-fixed::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table > tbody > tr > td > .ant-table-expanded-row-fixed::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-body > table > tbody > tr > td > .ant-table-expanded-row-fixed::after,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-summary > table > tbody > tr > td > .ant-table-expanded-row-fixed::after {
  position: absolute;
  top: 0;
  right: 1px;
  bottom: 0;
  border-right: 1px solid ${borderLight};;
  content: '';
}
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table,
.ant-table.ant-table-bordered > .ant-table-container > .ant-table-header > table {
  border-top: 1px solid ${borderLight};;
}
.ant-table.ant-table-bordered.ant-table-scroll-horizontal > .ant-table-container > .ant-table-body > table > tbody > tr.ant-table-expanded-row > td,
.ant-table.ant-table-bordered.ant-table-scroll-horizontal > .ant-table-container > .ant-table-body > table > tbody > tr.ant-table-placeholder > td {
  border-right: 0;
}
.ant-table.ant-table-bordered.ant-table-middle > .ant-table-container > .ant-table-content > table > tbody > tr > td > .ant-table-expanded-row-fixed,
.ant-table.ant-table-bordered.ant-table-middle > .ant-table-container > .ant-table-body > table > tbody > tr > td > .ant-table-expanded-row-fixed {
  margin: -12px -9px;
}
.ant-table.ant-table-bordered.ant-table-small > .ant-table-container > .ant-table-content > table > tbody > tr > td > .ant-table-expanded-row-fixed,
.ant-table.ant-table-bordered.ant-table-small > .ant-table-container > .ant-table-body > table > tbody > tr > td > .ant-table-expanded-row-fixed {
  margin: -8px -9px;
}
.ant-table.ant-table-bordered > .ant-table-footer {
  border: 1px solid ${borderLight};;
  border-top: 0;
}
.ant-table-cell .ant-table-container:first-child {
  border-top: 0;
}
.ant-table-cell-scrollbar:not([rowspan]) {
  box-shadow: 0 1px 0 1px #fafafa;
}

.ant-table {
  color: ${textPrimary};
  background: ${bgLight};
}

.ant-table-footer {
  padding: 16px 16px;
  color: ${textPrimary};
  background: ${bgElevated};
}
.ant-table-thead > tr > th {
  color: ${textPrimary};
  background: ${bgElevated};
  border-bottom: 1px solid ${borderLight};
}

.ant-table-tbody > tr > td {
  border-bottom: 1px solid ${borderLight};;
}

.ant-table-tbody > tr.ant-table-row:hover > td,
.ant-table-tbody > tr > td.ant-table-cell-row-hover {
  background: ${bgElevated};
}
.ant-table-tbody > tr.ant-table-row-selected > td {
  background: #e6f7ff;
  border-color: rgba(0, 0, 0, 0.03);
}
.ant-table-tbody > tr.ant-table-row-selected:hover > td {
  background: ${bgHover};
}
.ant-table-summary {
  background: ${bgLight};
}
div.ant-table-summary {
  box-shadow: 0 -1px 0 ${borderLight};;
}
.ant-table-summary > tr > th,
.ant-table-summary > tr > td {
  border-bottom: 1px solid ${borderLight};;
}

.ant-table-thead th.ant-table-column-has-sorters:focus-visible {
  color: ${colorDark};
}
.ant-table-thead th.ant-table-column-has-sorters.ant-table-cell-fix-left:hover,
.ant-table-thead th.ant-table-column-has-sorters.ant-table-cell-fix-right:hover {
  background: ${bgHighlight};
}
.ant-table-thead th.ant-table-column-sort {
  background: ${bgHighlight};
}

td.ant-table-column-sort {
  background: ${bgElevated};
}

.ant-table-column-sorter-up.active,
.ant-table-column-sorter-down.active {
  color: ${colorDark};

.ant-table-column-sorter-up + .ant-table-column-sorter-down {
  margin-top: -0.3em;
}
.ant-table-column-sorters:hover .ant-table-column-sorter {
  color: #a6a6a6;
}

.ant-table-filter-trigger:hover {
  color: ${colorTrans45};
  background: rgba(0, 0, 0, 0.04);
}
.ant-table-filter-trigger.active {
  color: ${colorDark};
}
.ant-table-filter-dropdown {
  color: ${textPrimary};
  background-color: ${bgLight};
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.ant-table-filter-dropdown .ant-dropdown-menu:empty::after {
  color: ${colorTrans25});
}

.ant-table-filter-dropdown-tree .ant-tree-treenode .ant-tree-node-content-wrapper:hover {
  background-color: ${bgHighlight};
}
.ant-table-filter-dropdown-tree .ant-tree-treenode-checkbox-checked .ant-tree-node-content-wrapper,
.ant-table-filter-dropdown-tree .ant-tree-treenode-checkbox-checked .ant-tree-node-content-wrapper:hover {
  background-color: #bae7ff;
}
.ant-table-filter-dropdown-search {
  padding: 8px;
  border-bottom: 1px ${borderLight}; solid;
}
.ant-table-filter-dropdown-search-input input {
  min-width: 140px;
}
.ant-table-filter-dropdown-search-input .anticon {
  color: ${colorTrans25});
}
.ant-table-filter-dropdown-btns {
  border-top: 1px solid ${borderLight};;
}
.ant-table-selection-extra .anticon {
  color: #bfbfbf;
}
.ant-table-selection-extra .anticon:hover {
  color: #a6a6a6;
}
.ant-table-row-expand-icon {
  color: ${colorDark};
  background: ${bgLight};
  border: 1px solid ${borderLight};;
}
.ant-table-row-expand-icon:focus-visible,
.ant-table-row-expand-icon:hover {
  color: ${colorPrimary};
}
.ant-table-row-expand-icon:active {
  color: #096dd9;
}
.ant-table-empty .ant-table-tbody > tr.ant-table-placeholder {
  color: ${colorTrans25});
}
.ant-table-tbody > tr.ant-table-placeholder:hover > td {
  background: ${bgLight};
}
.ant-table-cell-fix-left,
.ant-table-cell-fix-right {
  background: ${bgLight};
}
.ant-table-sticky-holder {
  position: sticky;
  z-index: calc(2 + 1);
  background: ${bgLight};
}
.ant-table-sticky-scroll {
  background: ${bgLight};
  border-top: 1px solid ${borderLight};;
}
.ant-tree.ant-tree-directory .ant-tree-treenode:hover::before {
  background: ${bgHighlight};
}
.ant-tree.ant-tree-directory .ant-tree-treenode .ant-tree-node-content-wrapper.ant-tree-node-selected {
  color: ${bgLight};
  background: transparent;
}
.ant-tree.ant-tree-directory .ant-tree-treenode-selected:hover::before,
.ant-tree.ant-tree-directory .ant-tree-treenode-selected::before {
  background: ${colorDark};
}
.ant-tree.ant-tree-directory .ant-tree-treenode-selected .ant-tree-switcher {
  color: ${bgLight};
}
.ant-tree.ant-tree-directory .ant-tree-treenode-selected .ant-tree-node-content-wrapper {
  color: ${bgLight};
  background: transparent;
}
.ant-tree-checkbox {
  color: ${textPrimary};
}
.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-inner,
.ant-tree-checkbox:hover .ant-tree-checkbox-inner,
.ant-tree-checkbox-input:focus + .ant-tree-checkbox-inner {
  border-color: ${colorDark};
}
.ant-tree-checkbox-checked::after {
  border: 1px solid ${colorDark};
}
.ant-tree-checkbox-inner {
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}
.ant-tree-checkbox-inner::after {
  border: 2px solid ${bgLight};
}
.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after {
  border: 2px solid ${bgLight};
}
.ant-tree-checkbox-checked .ant-tree-checkbox-inner {
  background-color: ${colorDark};
  border-color: ${colorDark};
}
.ant-tree-checkbox-disabled.ant-tree-checkbox-checked .ant-tree-checkbox-inner::after {
  border-color: ${colorTrans25});
}
.ant-tree-checkbox-disabled .ant-tree-checkbox-inner {
  background-color: ${bgHighlight};
  border-color: #d9d9d9 !important;
}
.ant-tree-checkbox-disabled .ant-tree-checkbox-inner::after {
  border-color: ${bgHighlight};
}
.ant-tree-checkbox-disabled + span {
  color: ${colorTrans25});
}

.ant-tree-checkbox-wrapper {
  color: ${textPrimary};
}

.ant-tree-checkbox-group {
  color: ${textPrimary};
}

.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner {
  background-color: ${bgLight};
  border-color: #d9d9d9;
}
.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner::after {
  background-color: ${colorDark};
}
.ant-tree-checkbox-indeterminate.ant-tree-checkbox-disabled .ant-tree-checkbox-inner::after {
  background-color: ${colorTrans25});
  border-color: ${colorTrans25});
}
.ant-tree {
  color: ${textPrimary};
  background: ${bgLight};
}
.ant-tree-focused:not(:hover):not(.ant-tree-active-focused) {
  background: #e6f7ff;
}
.ant-tree.ant-tree-block-node .ant-tree-list-holder-inner .ant-tree-treenode.dragging::after {
  border: 1px solid ${colorDark};
}

.ant-tree .ant-tree-treenode-disabled .ant-tree-node-content-wrapper {
  color: ${colorTrans25});
}

.ant-tree .ant-tree-treenode-active .ant-tree-node-content-wrapper {
  background: ${bgHighlight};
}
.ant-tree-switcher-loading-icon {
  color: ${colorDark};
}
.ant-tree .ant-tree-node-content-wrapper:hover {
  background-color: ${bgHighlight};
}
.ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected {
  background-color: #bae7ff;
}
.ant-tree-node-content-wrapper .ant-tree-drop-indicator {
  background-color: ${colorDark};
}
.ant-tree-node-content-wrapper .ant-tree-drop-indicator::after {
  border: 2px solid ${colorDark};
}
.ant-tree .ant-tree-treenode.drop-container > [draggable] {
  box-shadow: 0 0 0 2px ${colorDark};
}
.ant-tree-show-line .ant-tree-indent-unit::before {
  border-right: 1px solid #d9d9d9;
}
.ant-tree-show-line .ant-tree-switcher {
  background: ${bgLight};
}
.ant-timeline {
  color: ${textPrimary};
}

.ant-timeline-item-tail {
  border-left: 2px solid ${borderLight};;
}
.ant-timeline-item-head {
  background-color: ${bgLight};
}
.ant-timeline-item-head-blue {
  color: ${colorDark};
  border-color: ${colorDark};
}
.ant-timeline-item-head-red {
  color: #ff4d4f;
  border-color: #ff4d4f;
}
.ant-timeline-item-head-green {
  color: #52c41a;
  border-color: #52c41a;
}
.ant-timeline-item-head-gray {
  color: ${colorTrans25});
  border-color: ${colorTrans25});
}
.ant-timeline.ant-timeline-pending .ant-timeline-item-last .ant-timeline-item-tail {
  border-left: 2px dotted ${borderLight};;
}

.ant-timeline.ant-timeline-reverse .ant-timeline-item-pending .ant-timeline-item-tail {
  border-left: 2px dotted ${borderLight};;
}
.ant-timeline-rtl .ant-timeline-item-tail {
  border-right: 2px solid ${borderLight};;
}
.ant-timeline-rtl.ant-timeline.ant-timeline-pending .ant-timeline-item-last .ant-timeline-item-tail {
  border-right: 2px dotted ${borderLight};;
  border-left: none;
}
.ant-timeline-rtl.ant-timeline.ant-timeline-reverse .ant-timeline-item-pending .ant-timeline-item-tail {
  border-right: 2px dotted ${borderLight};;
  border-left: none;
}
.ant-transfer-customize-list .ant-table-wrapper .ant-table-small > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th {
  background: ${bgElevated};
}

.ant-table-small .ant-table-thead > tr > th {
  background-color: ${bgElevated};
}

.ant-transfer-customize-list .ant-table-wrapper .ant-table-small > .ant-table-content .ant-table-row:last-child td {
  border-bottom: 1px solid ${borderLight};;
}
.ant-transfer-status-error .ant-transfer-list {
  border-color: #ff4d4f;
}
.ant-transfer-status-error .ant-transfer-list-search:not([disabled]) {
  border-color: #d9d9d9;
}
.ant-transfer-status-error .ant-transfer-list-search:not([disabled]):hover {
  border-color: ${colorPrimary};
  border-right-width: 1px;
}
.ant-transfer-status-error .ant-transfer-list-search:not([disabled]):focus {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.ant-transfer-status-warning .ant-transfer-list {
  border-color: #faad14;
}
.ant-transfer-status-warning .ant-transfer-list-search:not([disabled]) {
  border-color: #d9d9d9;
}
.ant-transfer-status-warning .ant-transfer-list-search:not([disabled]):hover {
  border-color: ${colorPrimary};
  border-right-width: 1px;
}
.ant-transfer-status-warning .ant-transfer-list-search:not([disabled]):focus {
  border-color: ${colorPrimary};
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.ant-transfer {
  color: ${textPrimary};
}
.ant-transfer-disabled .ant-transfer-list {
  background: ${bgHighlight};
}
.ant-transfer-list {
  border: 1px solid #d9d9d9;
}
.ant-transfer-list-search .anticon-search {
  color: ${colorTrans25});
}
.ant-transfer-list-header {
  color: ${textPrimary};
  background: ${bgLight};
  border-bottom: 1px solid ${borderLight};;
}
.ant-transfer-list-content-item-remove {
  color: #d9d9d9;
}
.ant-transfer-list-content-item-remove:hover {
  color: ${colorPrimary};
}
.ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled):hover {
  background-color: ${bgHighlight};
}
.ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled).ant-transfer-list-content-item-checked:hover {
  background-color: ${bgHover};
}

.ant-transfer-list-content-item-checked {
  background-color: #e6f7ff;
}
.ant-transfer-list-content-item-disabled {
  color: ${colorTrans25});
}
.ant-transfer-list-pagination {
  border-top: 1px solid ${borderLight};;
}
.ant-transfer-list-body-not-found {
  color: ${colorTrans25});
}
.ant-transfer-list-footer {
  border-top: 1px solid ${borderLight};;
}
.ant-select-tree-checkbox {

  color: ${textPrimary};
}
.ant-select-tree-checkbox-wrapper:hover .ant-select-tree-checkbox-inner,
.ant-select-tree-checkbox:hover .ant-select-tree-checkbox-inner,
.ant-select-tree-checkbox-input:focus + .ant-select-tree-checkbox-inner {
  border-color: ${colorDark};
}
.ant-select-tree-checkbox-checked::after {
  border: 1px solid ${colorDark};
}
.ant-select-tree-checkbox-inner {
  background-color: ${bgLight};
  border: 1px solid #d9d9d9;
}
.ant-select-tree-checkbox-inner::after {
  border: 2px solid ${bgLight};
}
.ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner::after {
  border: 2px solid ${bgLight};
}
.ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner {
  background-color: ${colorDark};
  border-color: ${colorDark};
}

.ant-select-tree-checkbox-disabled.ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner::after {
  border-color: ${colorTrans25});
}
.ant-select-tree-checkbox-disabled .ant-select-tree-checkbox-inner {
  background-color: ${bgHighlight};
  border-color: #d9d9d9 !important;
}
.ant-select-tree-checkbox-disabled .ant-select-tree-checkbox-inner::after {
  border-color: ${bgHighlight};
}
.ant-select-tree-checkbox-disabled + span {
  color: ${colorTrans25});
}
.ant-select-tree-checkbox-wrapper {
  color: ${textPrimary};
}
.ant-select-tree-checkbox-group {
  color: ${textPrimary};
}
.ant-select-tree-checkbox-indeterminate .ant-select-tree-checkbox-inner {
  background-color: ${bgLight};
  border-color: #d9d9d9;
}
.ant-select-tree-checkbox-indeterminate .ant-select-tree-checkbox-inner::after {
  background-color: ${colorDark};
}
.ant-select-tree-checkbox-indeterminate.ant-select-tree-checkbox-disabled .ant-select-tree-checkbox-inner::after {
  background-color: ${colorTrans25});
  border-color: ${colorTrans25});
}
.ant-select-tree {
  color: ${textPrimary};
  background: ${bgLight};
}
.ant-select-tree-focused:not(:hover):not(.ant-select-tree-active-focused) {
  background: #e6f7ff;
}
.ant-select-tree.ant-select-tree-block-node .ant-select-tree-list-holder-inner .ant-select-tree-treenode.dragging::after {
  border: 1px solid ${colorDark};
}
.ant-select-tree .ant-select-tree-treenode-disabled .ant-select-tree-node-content-wrapper {
  color: ${colorTrans25});
}
.ant-select-tree .ant-select-tree-treenode-active .ant-select-tree-node-content-wrapper {
  background: ${bgHighlight};
}

.ant-select-tree-switcher-loading-icon {
  color: ${colorDark};
}
.ant-select-tree .ant-select-tree-node-content-wrapper:hover {
  background-color: ${bgHighlight};
}
.ant-select-tree .ant-select-tree-node-content-wrapper.ant-select-tree-node-selected {
  background-color: #bae7ff;
}
.ant-select-tree-node-content-wrapper .ant-tree-drop-indicator {
  background-color: ${colorDark};
}
.ant-select-tree-node-content-wrapper .ant-tree-drop-indicator::after {
  border: 2px solid ${colorDark};
}
.ant-select-tree .ant-select-tree-treenode.drop-container > [draggable] {
  box-shadow: 0 0 0 2px ${colorDark};
}
.ant-select-tree-show-line .ant-select-tree-indent-unit::before {
  border-right: 1px solid #d9d9d9;
}
.ant-select-tree-show-line .ant-select-tree-switcher {
  background: ${bgLight};
}
.ant-typography {
  color: ${textPrimary};
}
.ant-typography.ant-typography-secondary {
  color: ${colorTrans45};
}
.ant-typography.ant-typography-success {
  color: #52c41a;
}
.ant-typography.ant-typography-warning {
  color: #faad14;
}
.ant-typography.ant-typography-danger {
  color: #ff4d4f;
}
a.ant-typography.ant-typography-danger:active,
a.ant-typography.ant-typography-danger:focus {
  color: #d9363e;
}
a.ant-typography.ant-typography-danger:hover {
  color: #ff7875;
}
.ant-typography.ant-typography-disabled {
  color: ${colorTrans25});
}
h1.ant-typography,
div.ant-typography-h1,
div.ant-typography-h1 > textarea,
.ant-typography h1 {
  color: ${textPrimary};
}
h2.ant-typography,
div.ant-typography-h2,
div.ant-typography-h2 > textarea,
.ant-typography h2 {
  color: ${textPrimary};
}
h3.ant-typography,
div.ant-typography-h3,
div.ant-typography-h3 > textarea,
.ant-typography h3 {
  color: ${textPrimary};
}
h4.ant-typography,
div.ant-typography-h4,
div.ant-typography-h4 > textarea,
.ant-typography h4 {
  color: ${textPrimary};
}
h5.ant-typography,
div.ant-typography-h5,
div.ant-typography-h5 > textarea,
.ant-typography h5 {
  color: ${textPrimary};
}
a.ant-typography,
.ant-typography a {
  color: ${colorDark};
}
a.ant-typography:focus-visible,
.ant-typography a:focus-visible,
a.ant-typography:hover,
.ant-typography a:hover {
  color: ${colorPrimary};
}
a.ant-typography:active,
.ant-typography a:active {
  color: #096dd9;
}

a.ant-typography[disabled],
.ant-typography a[disabled],
a.ant-typography.ant-typography-disabled,
.ant-typography a.ant-typography-disabled {
  color: ${colorTrans25});
}
a.ant-typography[disabled]:active,
.ant-typography a[disabled]:active,
a.ant-typography.ant-typography-disabled:active,
.ant-typography a.ant-typography-disabled:active,
a.ant-typography[disabled]:hover,
.ant-typography a[disabled]:hover,
a.ant-typography.ant-typography-disabled:hover,
.ant-typography a.ant-typography-disabled:hover {
  color: ${colorTrans25});
}
a.ant-typography[disabled]:active,
.ant-typography a[disabled]:active,
a.ant-typography.ant-typography-disabled:active,
.ant-typography a.ant-typography-disabled:active {
  pointer-events: none;
}
.ant-typography code {
  background: rgba(150, 150, 150, 0.1);
  border: 1px solid rgba(100, 100, 100, 0.2);
}
.ant-typography kbd {
  background: rgba(150, 150, 150, 0.06);
  border: 1px solid rgba(100, 100, 100, 0.2);
}
.ant-typography mark {
  background-color: #ffe58f;
}
.ant-typography-expand,
.ant-typography-edit,
.ant-typography-copy {
  color: ${colorDark};
}
.ant-typography-expand:focus-visible,
.ant-typography-edit:focus-visible,
.ant-typography-copy:focus-visible,
.ant-typography-expand:hover,
.ant-typography-edit:hover,
.ant-typography-copy:hover {
  color: ${colorPrimary};
}
.ant-typography-expand:active,
.ant-typography-edit:active,
.ant-typography-copy:active {
  color: #096dd9;
}
.ant-typography-copy-success,
.ant-typography-copy-success:hover,
.ant-typography-copy-success:focus {
  color: #52c41a;
}

.ant-typography-edit-content-confirm {
  color: ${colorTrans45};
}
.ant-typography pre {
  background: rgba(150, 150, 150, 0.1);
}
.ant-typography blockquote {
  border-left: 4px solid rgba(100, 100, 100, 0.2);
}
.ant-upload {
  color: ${textPrimary};
}
.ant-upload.ant-upload-disabled {
  color: ${colorTrans25});
}
.ant-upload.ant-upload-select-picture-card {
  background: ${bgElevated};
  border: 1px dashed #d9d9d9;
}

.ant-upload.ant-upload-select-picture-card:hover {
  border-color: ${colorDark};
}
.ant-upload-disabled.ant-upload.ant-upload-select-picture-card:hover {
  border-color: #d9d9d9;
}
.ant-upload.ant-upload-drag {
  background: ${bgElevated};
  border: 1px dashed #d9d9d9;
}
.ant-upload.ant-upload-drag .ant-upload {

.ant-upload.ant-upload-drag.ant-upload-drag-hover:not(.ant-upload-disabled) {
  border-color: #096dd9;
}

.ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
  border-color: ${colorPrimary};
}

.ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon {
  color: ${colorPrimary};
}
.ant-upload.ant-upload-drag p.ant-upload-text {
  color: ${textPrimary};
}
.ant-upload.ant-upload-drag p.ant-upload-hint {
  color: ${colorTrans45};
}
.ant-upload.ant-upload-drag .anticon-plus {
  color: ${colorTrans25});
}
.ant-upload.ant-upload-drag .anticon-plus:hover {
  color: ${colorTrans45};
}
.ant-upload.ant-upload-drag:hover .anticon-plus {
  color: ${colorTrans45};
}
.ant-upload-list {
  color: ${textPrimary};
}
.ant-upload-list-item-card-actions .anticon {
  color: ${colorTrans45};
  transition: all 0.3s;
}
.ant-upload-list-item-card-actions:hover .anticon {
  color: ${textPrimary};
}
.ant-upload-list-item-info .anticon-loading .anticon,
.ant-upload-list-item-info .ant-upload-text-icon .anticon {
  position: absolute;
  top: 5px;
  color: ${colorTrans45};
  font-size: 14px;
}
.ant-upload-list-item:hover .ant-upload-list-item-info {
  background-color: ${bgHighlight};
}
.ant-upload-list-picture .ant-upload-list-item-error .ant-upload-list-item-thumbnail .anticon svg path[fill='#e6f7ff'],
.ant-upload-list-picture-card .ant-upload-list-item-error .ant-upload-list-item-thumbnail .anticon svg path[fill='#e6f7ff'] {
  fill: #fff2f0;
}
.ant-upload-list-picture .ant-upload-list-item-error .ant-upload-list-item-thumbnail .anticon svg path[fill='${colorDark}'],
.ant-upload-list-picture-card .ant-upload-list-item-error .ant-upload-list-item-thumbnail .anticon svg path[fill='${colorDark}'] {
  fill: #ff4d4f;
}
.ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-eye:hover,
.ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-download:hover,
.ant-upload-list-picture-card .ant-upload-list-item-actions .anticon-delete:hover {
  color: ${bgLight};
}
.ant-upload-list-picture-card .ant-upload-list-item-uploading.ant-upload-list-item {
  background: ${bgElevated};
}
`;

  return antdTheme;
};
