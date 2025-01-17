/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import ConnectionInfoSubscription from './ConnectionInfoSubscription';
import ConnectionInfoCurrent from './ConnectionInfoCurrent';
import ConnectionInfoFetch from './ConnectionInfoFetch';
import ConnectionInfoRefresh from './ConnectionInfoRefresh';
import NetInfoHook from './NetInfoHook';
import IsConnected from './IsConnected';

// Examples which show the user how to correctly use the library
interface Example {
  id: string;
  title: string;
  description: string;
  render(): React.ReactNode;
}

const EXAMPLES: Example[] = [
  {
    id: 'isConnected',
    title: 'NetInfo.isConnected',
    description: 'Asynchronously load and observe connectivity',
    render() {
      return <IsConnected />;
    },
  },
  {
    id: 'fetch',
    title: 'NetInfo.fetch',
    description: 'Fetch the state on tap',
    render() {
      return <ConnectionInfoFetch />;
    },
  },
  {
    id: 'refresh',
    title: 'NetInfo.refresh',
    description: 'Refresh the state on tap',
    render() {
      return <ConnectionInfoRefresh />;
    },
  },
  {
    id: 'currentInfoSingle',
    title: 'Current Info Single',
    description: 'Asynchronously load and observe connectionInfo',
    render() {
      return <ConnectionInfoCurrent />;
    },
  },
  {
    id: 'currentInfoHook',
    title: 'Current Info Hook',
    description:
      'Asynchronously load and observe connectionInfo using a React Hook',
    render() {
      return <NetInfoHook />;
    },
  },
  {
    id: 'currentInfoHistory',
    title: 'Current Info History',
    description: 'Observed updates to connectionInfo',
    render() {
      return <ConnectionInfoSubscription />;
    },
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 24,
    marginHorizontal: 8,
    marginTop: 24,
  },
  exampleContainer: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: '#FFF',
    borderColor: '#EEE',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  exampleTitle: {
    color: 'black',
    fontSize: 18,
  },
  exampleDescription: {
    color: '#333333',
    marginBottom: 16,
  },
  exampleInnerContainer: {
    borderColor: '#EEE',
    borderTopWidth: 1,
    paddingTop: 16,
  },
});

interface State {
  activeTestCase: Example | null;
}

export default class ExampleApp extends React.Component<
  Record<string, unknown>,
  State
> {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.state = {
      activeTestCase: null,
    };
  }

  render() {
    const {activeTestCase} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView testID="scrollView">
          {activeTestCase ? (
            <>
              <Text testID="testCasesTitle" style={styles.sectionTitle}>
                Test Case
              </Text>
              {this._renderExample(activeTestCase)}
            </>
          ) : (
            <>
              <Text testID="examplesTitle" style={styles.sectionTitle}>
                Examples
              </Text>
              {EXAMPLES.map(this._renderExample)}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  _renderExample = (example: Example) => {
    return (
      <View
        testID={`example-${example.id}`}
        key={example.title}
        style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>{example.title}</Text>
        <Text style={styles.exampleDescription}>{example.description}</Text>
        <View style={styles.exampleInnerContainer}>{example.render()}</View>
      </View>
    );
  };
}
