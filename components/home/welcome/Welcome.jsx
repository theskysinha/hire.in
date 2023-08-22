import React from 'react';
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList 
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './welcome.style';
import { icons, SIZES } from '../../../constants'; 

const jobTypes = [
  "Full Time",
  "Part Time",
  "Internship",
  "Freelance"
]

const Welcome = ({ searchTerm, setSearchTerm, handlePress}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = React.useState(jobTypes[0]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Akash</Text>
        <Text style={styles.welcomeMessage}>Find your dream Job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            value= {searchTerm}
            placeholder='What are you looking for?'
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handlePress}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      
      <View style = {styles.tabsContainer}>
        <FlatList
          data = {jobTypes}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`)
              }}
              >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small}}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default Welcome