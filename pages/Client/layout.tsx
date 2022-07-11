import React, { useState } from 'react'
import { Box,useTheme, View,} from 'native-base'
import AppBar from '../../components/appbar'
import Navbar from '../../components/navbar'

import PagerView from 'react-native-pager-view'
import { StyleSheet } from 'react-native'

const Layout = ({children} : {children : any}) => {
    const {colors} = useTheme();
    const [initPage, setInitPage] = useState(1)
  return (
    <>
        <Box safeAreaTop />
        <View  flex={1}  style = {styles.page} backgroundColor={colors.primary[100]}>
            <AppBar/>
            <PagerView  style={styles.viewPager} initialPage={initPage} >
                {
                    children
                }
            </PagerView>
            <Navbar setInitPage={setInitPage}/>
        </View>
    </>
  )
}

export default Layout


const styles = StyleSheet.create({
    page : {
        height : 400
    },
    body : {
        width : '100%',
        marginTop : 10,
    },
    viewPager : {
        width : "100%",
        flex : 1,
        marginTop : 5
    }

})