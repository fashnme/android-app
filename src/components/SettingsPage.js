import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  settingsPageRowPressed
} from '../actions';

class SettingsPage extends Component {
   profile({ avatarUrl, title, subtitle, key }) {
    return (
      <ListItem
        leftAvatar={{ source: { uri: avatarUrl } }}
        title={title}
        titleStyle={styles.title}
        subtitle={subtitle}
        rightTitle={'Edit'}
        rightTitleStyle={{ color: '#2089dc', fontWeight: 'bold' }}
        containerStyle={styles.containerStyle}
        onPress={() => { this.props.settingsPageRowPressed({ key }); }}
      />
    );
  }

  defaultView({ avatarUrl, title, subtitle, key }) {
    return (
      <ListItem
        leftAvatar={{ source: { uri: avatarUrl } }}
        title={title}
        titleStyle={styles.title}
        subtitle={subtitle}
        chevron={{ color: '#474747', size: 20 }}
        containerStyle={styles.containerStyle}
        onPress={() => { this.props.settingsPageRowPressed({ key }); }}
      />
    );
  }

  badgeView({ avatarUrl, title, subtitle, key }) {
    return (
      <ListItem
        leftAvatar={{ source: { uri: avatarUrl } }}
        title={title}
        titleStyle={styles.title}
        subtitle={subtitle}
        badge={{ status: 'success', value: 10 }}
        containerStyle={styles.containerStyle}
        onPress={() => { this.props.settingsPageRowPressed({ key }); }}
      />
    );
  }

  headingView({ title }) {
    return (
      <ListItem
        title={title}
        titleStyle={[styles.title, { fontSize: 20 }]}
        containerStyle={{ height: 60 }}
        topDivider
      />
    );
  }

  renderItem({ item }) {
    const { avatarUrl, title, type, subtitle, key } = item;
    switch (type) {
      case 'edit':
        return this.profile({ avatarUrl, title, subtitle, key });
      case 'badge':
        return this.badgeView({ avatarUrl, title, subtitle, key });
      case 'heading':
        return this.headingView({ title });
      default:
        return this.defaultView({ avatarUrl, title, subtitle, key });
    }
  }

  render() {
    const { settingsArray } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={settingsArray}
            renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  title: {
      fontWeight: 'bold'
  },
  containerStyle: {
    height: 60
  }
};

const mapStateToProps = ({ settingsPageState }) => {
    const { settingsArray } = settingsPageState;
    return { settingsArray };
};

export default connect(mapStateToProps, {
  settingsPageRowPressed
})(SettingsPage);
