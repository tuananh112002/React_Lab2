import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DetailListIt from '../components/DetailListItem';
const Options = () => {
    return (
        <View style={styles.container}>
            <DetailListIt title="Update Profile" />
            <DetailListIt title="Change Language" />
            <DetailListIt title="Sign Out" />
        </View>
    );
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
    }
);
export default Options; 