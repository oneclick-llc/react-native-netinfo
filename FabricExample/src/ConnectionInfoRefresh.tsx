/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import NetInfo from 'react-native-netinfo';

interface State {
  connectionInfo: string;
}

export default class ConnectionInfoCurrent extends React.Component<
  Record<string, unknown>,
  State
> {
  state = {
    connectionInfo: 'Tap to refresh state',
  };

  componentDidMount(): void {
    this._refreshState();
  }

  _refreshState = async (): Promise<void> => {
    const state = await NetInfo.refresh();
    this.setState({
      connectionInfo: JSON.stringify(state),
    });
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._refreshState}>
          <Text style={{color: 'black'}}>{this.state.connectionInfo}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
