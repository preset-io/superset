/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { SupersetThemeProvider } from '@superset-ui/design-system';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { store } from './store';
import FlashProvider from '../components/FlashProvider';
import { bootstrapData } from '../preamble';
import { EmbeddedUiConfigProvider } from '../components/UiConfigContext';
import { DynamicPluginProvider } from '../components/DynamicPlugins';

const common = { ...bootstrapData.common };

export const RootContextProviders: React.FC = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    });
  }, [themeMode]);
  return (
    <SupersetThemeProvider mode={themeMode} themeOverride={{}}>
      <ReduxProvider store={store}>
        <DndProvider backend={HTML5Backend}>
          <FlashProvider messages={common.flash_messages}>
            <EmbeddedUiConfigProvider>
              <DynamicPluginProvider>
                <QueryParamProvider
                  ReactRouterRoute={Route}
                  stringifyOptions={{ encode: false }}
                >
                  {children}
                </QueryParamProvider>
              </DynamicPluginProvider>
            </EmbeddedUiConfigProvider>
          </FlashProvider>
        </DndProvider>
      </ReduxProvider>
    </SupersetThemeProvider>
  );
};
