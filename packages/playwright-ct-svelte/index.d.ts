/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Snippet } from "svelte"
import type {
  SvelteComponent as V4Component,
  Component as V5Component,
  ComponentProps
} from 'svelte/types/runtime';
import type { TestType, Locator } from '@playwright/experimental-ct-core';

type ComponentSlot = Snippet | string;
type ComponentSlots = Record<string, ComponentSlot> & { default?: ComponentSlot };
type ComponentEvents = Record<string, Function>;

export interface MountOptions<
  HooksConfig,
  Component extends (new (...args: any[]) => V4Component) | V5Component
> {
  props?: ComponentProps<InstanceType<Component>>;
  slots?: ComponentSlots;
  on?: ComponentEvents;
  hooksConfig?: HooksConfig;
}

export interface MountResult<
  Component extends (new (...args: any[]) => V4Component) | V5Component
> extends Locator {
  unmount(): Promise<void>;
  update(options: {
    props?: Partial<ComponentProps<InstanceType<Component>>>;
    on?: Partial<ComponentEvents>;
  }): Promise<void>;
}

export const test: TestType<{
  mount<
    HooksConfig,
    Component extends (new (...args: any[]) => V4Component) | V5Component
  >(
    component: Component,
    options?: MountOptions<HooksConfig, InstanceType<Component>>
  ): Promise<MountResult<Component>>;
}>;

export {
  defineConfig,
  PlaywrightTestConfig,
  expect,
  devices
} from '@playwright/experimental-ct-core';
