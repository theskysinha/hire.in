import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS } from '../../../constants' 
import useFetch from '../../../hooks/useFetch'
import styles from './nearbyjobs.style'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch(
    'search', {
      query: "React Developer",
      num_pages: 1
    }
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((job) => (
            <NearbyJobCard
              key={`nearby-job-${job.job_id}`}
              job={job}
              handlePress = {() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>  
    </View>
  )
}


export default Nearbyjobs