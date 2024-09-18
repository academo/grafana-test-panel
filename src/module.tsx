import { PanelPlugin, StandardEditorProps } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';
import React, { useEffect } from 'react';
import { Input } from '@grafana/ui';

const customOptionDefaultValue = 'default value';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addBooleanSwitch({
      path: 'showSeriesCount',
      name: 'Show series counter',
      defaultValue: true,
    })
    .addCustomEditor({
      id: 'customEditor',
      path: 'customEditor',
      name: 'My custom editor',
      editor: CustomEditor,
      defaultValue: customOptionDefaultValue,
    });
});

export const CustomEditor = (props: StandardEditorProps) => {
  // all the panel options
  const currentOptions = props.context.options;
  // this editor current value
  const currentValue = props.value;
  // callback to "store" the current editor value
  // notice this doesn't save the options to the backend
  // that needs to be done by the user clicking the save button
  const onChange = props.onChange;

  useEffect(() => {
    // important to check if the current value is  not default value
    // to prevent infinite loops
    if (!currentOptions.showSeriesCount && currentValue !== customOptionDefaultValue) {
      onChange(customOptionDefaultValue);
    }
  }, [currentOptions, currentValue, onChange]);

  return (
    <div>
      <Input
        value={currentValue}
        onChange={(e) => {
          return onChange(e.currentTarget.value);
        }}
      />
    </div>
  );
};
