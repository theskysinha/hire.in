import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../../constants'
import styles from './popularjobs.style'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hooks/useFetch'

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch(
    'search', {
      query: "React Developer",
      num_pages: 1
    }
  )

  const [selectedJob, setSelectedJob] = useState();

  const handlePress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
      { isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Oops! Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handlePress={handlePress}
              />
            )}
            keyExtractor={item => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium}}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>  
    </View>
  )
}

export default Popularjobs