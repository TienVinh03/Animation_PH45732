import { StyleSheet, Text, View, ViewToken, FlatList } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimationFlatList = () => {
    const viewableItems = useSharedValue<ViewToken[]>([]);

    type Item = {
        id: string;
        title: string;
        memo: string;
    };

    // Dữ liệu mẫu cho FlatList
    const data: Item[] = [
        { id: '1', title: 'Title 1', memo: 'This is memo 1' },
        { id: '2', title: 'Title 2', memo: 'This is memo 2' },
        { id: '3', title: 'Title 3', memo: 'This is memo 3' },
        { id: '4', title: 'Title 1', memo: 'This is memo 1' },
        { id: '5', title: 'Title 2', memo: 'This is memo 2' },
        { id: '6', title: 'Title 3', memo: 'This is memo 3' },
        { id: '7', title: 'Title 1', memo: 'This is memo 1' },
        { id: '8', title: 'Title 2', memo: 'This is memo 2' },
        { id: '9', title: 'Title 3', memo: 'This is memo 3' },
        // Thêm nhiều phần tử hơn nếu cần
    ];

    const ListItem: React.FC<ListItemProps> = React.memo(({ item, viewableItems }) => {
        const rStyle = useAnimatedStyle(() => {
            const isVisible = Boolean(
                viewableItems.value
                    .filter((item) => item.isViewable)
                    .find((viewableItem) => viewableItem.item.id === item.id)
            );
            return {
                opacity: withTiming(isVisible ? 1 : 0),
                transform: [
                    {
                        scale: withTiming(isVisible ? 1 : 0.6),
                    },
                ],
            };
        }, []);

        return (
            <Animated.View style={[styles.itemContainer, rStyle]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.memo}>{item.memo}</Text>
            </Animated.View>
        );
    });

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={({ viewableItems: vItems }) => {
                    viewableItems.value = vItems;
                }}
                renderItem={({ item }) => {
                    return <ListItem item={item} viewableItems={viewableItems} />;
                }}
            />
        </View>
    );
};

export default AnimationFlatList;

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    itemContainer: {
        width: '100%',
        padding: 20,
        marginVertical: 10,
        backgroundColor: 'aqua',
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    memo: {
        fontSize: 14,
        color: 'gray',
    },
});
