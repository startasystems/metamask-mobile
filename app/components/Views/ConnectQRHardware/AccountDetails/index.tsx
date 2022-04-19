import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Device from '../../../../util/device';
import { getEtherscanAddressUrl } from '../../../../util/etherscan';
import { renderFromWei } from '../../../../util/number';
import { mockTheme, useAppThemeFromContext } from '../../../../util/theme';
import EthereumAddress from '../../../UI/EthereumAddress';

interface IAccountDetailsProps {
	item: any;
	provider: {
		ticker: string;
		network: string;
	};
}

const createStyle = (colors: any) =>
	StyleSheet.create({
		rowContainer: {
			flex: 1,
			height: 65,
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingLeft: Device.isIphoneX() ? 20 : 10,
		},
		accountDetails: {
			justifyContent: 'flex-start',
		},
		linkIcon: {
			height: '100%',
			fontSize: 36,
			textAlignVertical: 'center',
		},
		index: {
			fontSize: 22,
			color: colors.text.default,
		},
		information: {
			color: colors.text.muted,
		},
	});

const AccountDetails = (props: IAccountDetailsProps) => {
	const { colors } = useAppThemeFromContext() || mockTheme;
	const styles = createStyle(colors);
	const navigation = useNavigation();
	const { item, provider } = props;

	const toEtherscan = (address: string) => {
		const accountLink = getEtherscanAddressUrl(provider.network, address);
		navigation.navigate('Webview', {
			screen: 'SimpleWebview',
			params: {
				url: accountLink,
			},
		});
	};

	return (
		<View style={styles.rowContainer}>
			<View style={styles.accountDetails}>
				<Text style={styles.index}>{item.index}</Text>
				<EthereumAddress style={styles.information} address={item.address} type={'short'} />
				<Text style={styles.information}>
					{renderFromWei(item.balance)} {provider.ticker}
				</Text>
			</View>
			<Icon
				size={18}
				name={'external-link'}
				onPress={() => toEtherscan(item.address)}
				style={styles.linkIcon}
				color={colors.text.default}
			/>
		</View>
	);
};

export default AccountDetails;
