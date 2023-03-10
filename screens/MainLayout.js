import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    FlatList
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
  } from "react-native-reanimated";
import {connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabAction';
import {
    Home,
    Search,
    CartTab,
    CartTabBottom,
    Favourite,
    Notification
} from "../screens"
import { Header, HorizontalFoodCard } from "../components";
import { COLORS, FONTS, icons, SIZES,  constants, dummyData} from "../constants";
import {LinearGradient} from "expo-linear-gradient"
  
const TabButton = ({label, icon, isFocused, onPress, outerContainerStyle, innerContainerStyle}) => {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <Animated.View 
                    style={[{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    outerContainerStyle
                    ]}>
                <Animated.View
                    style={[{
                        flexDirection: 'row',
                        width: "80%",
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                    },
                    innerContainerStyle]}
                >
                    <Image
                        source={icon}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: isFocused ? COLORS.white : COLORS.gray
                        }}
                    >
                    </Image>
                    {isFocused &&
                        <Text
                            numberOfLines={1}
                            style={{
                                marginLeft: SIZES.base,
                                color: COLORS.white,
                                ...FONTS.h4
                            }}
                        >
                            {label}
                        </Text>
                    }
                    </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export const MainLayout = ({drawerAnimationStyle, navigation, selectedTab, setSelectedTab}) => {
    
    const flatListRef = React.useRef();

    //Reanimated Shared Value
    const homeTabFlex = useSharedValue(1);
    const homeTabColor = useSharedValue(COLORS.white);
    const searchTabFlex = useSharedValue(1);
    const searchTabColor = useSharedValue(COLORS.white);
    const cartTabFlex = useSharedValue(1);
    const cartTabColor = useSharedValue(COLORS.white);
    const favouriteTabFlex = useSharedValue(1);
    const favouriteTabColor = useSharedValue(COLORS.white);
    const notificationTabFlex = useSharedValue(1);
    const notificationTabColor = useSharedValue(COLORS.white);

    //Reanimated Animated Style
    const homeFlexStyle = useAnimatedStyle(() => {
        return {
            flex: homeTabFlex.value
        }
    })
    const homeColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: homeTabColor.value
        }
    })
    const searchFlexStyle = useAnimatedStyle(() => {
        return {
            flex: searchTabFlex.value
        }
    })
    const searchColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: searchTabColor.value
        }
    })
    const cartFlexStyle = useAnimatedStyle(() => {
        return {
            flex: cartTabFlex.value
        }
    })
    const cartColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: cartTabColor.value
        }
    })
    const favouriteFlexStyle = useAnimatedStyle(() => {
        return {
            flex: favouriteTabFlex.value
        }
    })
    const favouriteColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: favouriteTabColor.value
        }
    })
    const notificationFlexStyle = useAnimatedStyle(() => {
        return {
            flex: notificationTabFlex.value
        }
    })
    const notificationColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: notificationTabColor.value
        }
    })

    React.useEffect(() => {
        setSelectedTab(constants.screens.home)
    }, [])

    React.useEffect(() => {
        if(selectedTab == constants.screens.home){
            flatListRef?.current?.scrollToIndex({index: 0, animated: false})

            homeTabFlex.value = withTiming(4, {duration: 500})
            homeTabColor.value = withTiming(COLORS.primary, {duration: 500})
        }else{
            homeTabFlex.value = withTiming(1, {duration: 500})
            homeTabColor.value = withTiming(COLORS.white, {duration: 500})
        }

        if(selectedTab == constants.screens.search){
            flatListRef?.current?.scrollToIndex({index: 1, animated: false})

            searchTabFlex.value = withTiming(4, {duration: 500})
            searchTabColor.value = withTiming(COLORS.primary, {duration: 500})
        }else{
            searchTabFlex.value = withTiming(1, {duration: 500})
            searchTabColor.value = withTiming(COLORS.white, {duration: 500})
        }

        if(selectedTab == constants.screens.cart){
            flatListRef?.current?.scrollToIndex({index: 2, animated: false})

            cartTabFlex.value = withTiming(4, {duration: 500})
            cartTabColor.value = withTiming(COLORS.primary, {duration: 500})
        }else{
            cartTabFlex.value = withTiming(1, {duration: 500})
            cartTabColor.value = withTiming(COLORS.white, {duration: 500})
        }

        if(selectedTab == constants.screens.favourite){
            flatListRef?.current?.scrollToIndex({index: 3, animated: false})

            favouriteTabFlex.value = withTiming(4, {duration: 500})
            favouriteTabColor.value = withTiming(COLORS.primary, {duration: 500})
        }else{
            favouriteTabFlex.value = withTiming(1, {duration: 500})
            favouriteTabColor.value = withTiming(COLORS.white, {duration: 500})
        }

        if(selectedTab == constants.screens.notification){
            flatListRef?.current?.scrollToIndex({index: 4, animated: false})

            notificationTabFlex.value = withTiming(4, {duration: 500})
            notificationTabColor.value = withTiming(COLORS.primary, {duration: 500})
        }else{
            notificationTabFlex.value = withTiming(1, {duration: 500})
            notificationTabColor.value = withTiming(COLORS.white, {duration: 500})
        }

    }, [selectedTab])
        

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: COLORS.white2,
                ...drawerAnimationStyle
            }}
        >
            {/*Header*/}
            <Header 
                containerStyle={{
                    height: 50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 40,
                    alignItems: 'center'
                }}
                title = {selectedTab.toUpperCase()}
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: COLORS.gray2,
                            borderRadius: SIZES.radius,
                        }}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image
                            source={icons.menu}
                        />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            justifyContent: 'center',
                        }}
                        onPress={() => navigation.navigate("DetailProfile")}
                    >
                        <Image
                            source={dummyData.myProfile?.profile_image}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: SIZES.radius
                            }}
                        />
                    </TouchableOpacity>
                }
            />


            {/*Content*/}
            <View style={{flex: 1, width: '100%'}}>
                <FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item, index}) => {
                        return (
                            <View
                                style={{
                                    width: SIZES.width
                                }}
                            >
                                {item.label == constants.screens.home && <Home />}
                                {item.label == constants.screens.search && <Search />}
                                {item.label == constants.screens.cart && <CartTabBottom />}
                                {item.label == constants.screens.favourite && <Favourite />}
                                {item.label == constants.screens.notification && <Notification />}

                            </View>
                        )
                    }}
                />
                                
            </View>


            {/*Footer*/}
            <View
                style={{
                    height: 100,
                    justifyContent: 'flex-end'
                }}
            >
                {/*Shadow*/}
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 4}}
                    colors={[COLORS.transparent, COLORS.lightGray1]}
                    style={{
                        position: 'absolute',
                        top: -20,
                        left: 0,
                        right: 0,
                        height: 100,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15
                    }}
                />
                {/*Tabs */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingBottom: 10,
                        backgroundColor: COLORS.white
                    }}
                >
                    <TabButton
                        label={constants.screens.home}
                        icon={icons.home}
                        outerContainerStyle={homeFlexStyle}
                        innerContainerStyle={homeColorStyle}
                        isFocused={selectedTab == constants.screens.home}
                        onPress={() => setSelectedTab(constants.screens.home)}
                    />
                    {/* <TabButton
                        label={constants.screens.search}
                        icon={icons.search}
                        outerContainerStyle={searchFlexStyle}
                        innerContainerStyle={searchColorStyle}
                        isFocused={selectedTab == constants.screens.search}
                        onPress={() => setSelectedTab(constants.screens.search)}
                    /> */}
                    <TabButton
                        label={constants.screens.cart}
                        icon={icons.cart}
                        outerContainerStyle={cartFlexStyle}
                        innerContainerStyle={cartColorStyle}
                        isFocused={selectedTab == constants.screens.cart}
                        onPress={() => setSelectedTab(constants.screens.cart)}
                    />
                    <TabButton
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        outerContainerStyle={favouriteFlexStyle}
                        innerContainerStyle={favouriteColorStyle}
                        isFocused={selectedTab == constants.screens.favourite}
                        onPress={() => setSelectedTab(constants.screens.favourite)}
                    />
                    <TabButton
                        label={constants.screens.notification}
                        icon={icons.notification}
                        outerContainerStyle={notificationFlexStyle}
                        innerContainerStyle={notificationColorStyle}
                        isFocused={selectedTab == constants.screens.notification}
                        onPress={() => setSelectedTab(constants.screens.notification)}
                    />
                </View>
            </View>
        </Animated.View>
    )
}


function mapStateToProps(state) {
    return {
        selectedTab: state.tabReducer.selectedTab,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedTab: (selectedTab) => dispatch(setSelectedTab(selectedTab))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);