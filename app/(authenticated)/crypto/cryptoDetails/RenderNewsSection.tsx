import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { INewsArticle } from '@/interface/crypto'
import { defaultStyles } from '@/constants/Styles'
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { NormalLoader } from '@/components/Loader';
import { useNewsBookmarkStore } from '@/store/newsBookmarkStore';
interface NewsSectionProps {
  data: INewsArticle[];
}
const RenderNewsSection = ({ data }: NewsSectionProps) => {
  const bookmarks = useNewsBookmarkStore((state) => state.bookmarks);
  const addBookmark = useNewsBookmarkStore((state) => state.addBookmark);
  const isBookmarked = (id: number) => bookmarks.some((b) => b.id === id);

  if (data == undefined) {
    return <NormalLoader />
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[defaultStyles.sectionBlock, { marginBottom: 20 }]}>
        {data && data.map((news) => {
          return (
            <View style={styles.listItem}>
              <Image
                source={{ uri: news.urlToImage ?? 'https://via.placeholder.com/150' }}
                style={styles.newsImg} />
              <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={[defaultStyles.flexRowView, { gap: 3 }]}>
                  <Text numberOfLines={1}
                    style={[defaultStyles.smallTitleTxt, { color: Colors.dark, flex: 1 }]}>{news.title}</Text>
                  <TouchableOpacity onPress={() => addBookmark({ id: news.id })}>
                    <Ionicons name={`${isBookmarked(news?.id)?'bookmark':'bookmark-outline'}`} size={20} />
                  </TouchableOpacity>
                </View>
                <Text numberOfLines={2} style={defaultStyles.smallSubTxt}>{news.description}</Text>
                <View style={defaultStyles.flexRowView}>
                  <Text style={[defaultStyles.smallSubTxt, { fontWeight: 'normal' }]}>
                    {news.author}</Text>
                  <Text style={[defaultStyles.smallSubTxt, { fontWeight: 'normal' }]}>
                    {format(new Date(news.publishedAt), "dd/MM/yyyy")
                    }</Text>
                </View>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default RenderNewsSection

const styles = StyleSheet.create({

  listItem: {
    flexDirection: 'row',
    gap: 14,
    flex: 1,
  },
  newsImg: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
})