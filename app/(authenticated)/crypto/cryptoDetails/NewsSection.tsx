import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { INewsArticle } from '@/interface/crypto'
import { defaultStyles } from '@/constants/Styles'
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { NormalLoader } from '@/components/Loader';
import { useNewsBookmarkStore } from '@/store/newsBookmarkStore';
import { useQuery } from '@tanstack/react-query';
import { IRootArticle } from '@/interface/cryptoInterface';
import EmptyComponent from '@/components/EmptyComponent';
interface Iprops {
  coinId: string,
  activeIndex: number
}

const NewsSection = ({ coinId, activeIndex }: Iprops) => {
  const bookmarks = useNewsBookmarkStore((state) => state.bookmarks);
  const addBookmark = useNewsBookmarkStore((state) => state.addBookmark);
  const isBookmarked = (id: string) => bookmarks.some((b) => b.id === id);
  const { data: articles, isFetching } = useQuery<IRootArticle>({
    queryKey: ['articles', coinId],
    queryFn: async () => {
      const response = await fetch(`/api/news?coinId=${coinId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    enabled: !!coinId && activeIndex === 1,
  });

  if (isFetching) {
    return <NormalLoader />
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[defaultStyles.sectionBlock, { marginBottom: 20 }]}>
        {(articles?.articles.length ?? 0) > 0 ?
          articles?.articles.map((article) => {
            return (
              <View style={styles.listItem}>
                <Image
                  source={{ uri: article.urlToImage ?? 'https://via.placeholder.com/150' }}
                  style={styles.newsImg} />
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View style={[defaultStyles.flexRowView, { gap: 3 }]}>
                    <Text numberOfLines={1}
                      style={[defaultStyles.smallTitleTxt, { color: Colors.dark, flex: 1 }]}>{article.title}</Text>
                    <TouchableOpacity onPress={() => addBookmark({ id: article.title })}>
                      <Ionicons name={`${isBookmarked(article.title) ? 'bookmark' : 'bookmark-outline'}`} size={20} />
                    </TouchableOpacity>
                  </View>
                  <Text numberOfLines={2} style={defaultStyles.smallSubTxt}>{article.description}</Text>
                  <View style={defaultStyles.flexRowView}>
                    <Text style={[defaultStyles.smallSubTxt, { fontWeight: 'normal' }]}>
                      {article.author}</Text>
                    <Text style={[defaultStyles.smallSubTxt, { fontWeight: 'normal' }]}>
                      {format(new Date(article.publishedAt), "dd/MM/yyyy")
                      }</Text>
                  </View>
                </View>
              </View>
            )
          }
          )
          : <EmptyComponent  emptyTxt='No news available...'/>
        }

      </View>
    </ScrollView >
  )
}

export default NewsSection

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