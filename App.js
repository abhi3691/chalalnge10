import React ,{Component} from 'react'

import {View, Text, StyleSheet,ActivityIndicator , FlatList,} from 'react-native'
import axios from 'axios'
export default class Category extends Component{
    constructor(){
        super();
        this.state = {
            loader : false,
            DATA :[]
        }
    }
    getData(){
        this.setState({loader :true})
        fetch('https://api.sampleapis.com/beers/ale')
        .then((response) => response.json())
        .then((response) => {
            if(response.length >0){
                this.setState({DATA : response})
            }
            this.setState({loader :false})
           // console.log('YOUR RESPONSE IS :',response)
        })
         .catch((error) => {
            this.setState({loader :false})
             console.log('Error is :' ,error)
         })

    }

    getAxiosData(){
        this.setState({loader:true})
        axios.get('https://api.sampleapis.com/beers/ale')
        .then((response) =>{
            this.setState({loader:false})
            console.log('AXIOS RESPONSE IS :',response)

        })
        .catch((error)=>{
            this.setState({loader:false})
            console.log('AXIOS  error is :',error)
        })
    }
    componentDidMount() {
        this.getData()
    }
    render(){
        const renderItem = ({item}) => (
            <View style={styles.itemContainer} >
                <Text style={styles.itemText} > {item.name} </Text>
                <Text style={styles.itemDes} > {item.price} </Text>
               
             </View>
        )
        return(
           
            <View style ={styles.container}>

                <ActivityIndicator size ={50} color ='blue' animating={this.state.loader} />
                <Text style={styles.headerText}
                onPress = {() => this.getAxiosData()}>Beers Price List</Text>
                <FlatList  style={{width :'95%',marginTop: 10}} 
                data ={this.state.DATA}
                renderItem = {renderItem} />

            </View>
           
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#eeeeee',
        
    },
    headerText:{
        fontSize:24,
        fontWeight:'bold',
        color:'#000',
        borderBottomWidth:1,
        borderColor:'red',
        color:'#369',
        marginBottom:55,
       
        
    },
    itemContainer :{
        width:'100%',
        padding:10,
        backgroundColor:'#ffffff',
        elevation:4,
        marginBottom:10,
    },
    itemText :{
        fontSize:16,
        fontWeight:'bold',
        color:'#000'
    },
    itemDes:{
        fontSize:14,
        color:'#369',
        fontWeight:'bold',
        marginTop:10,
    },

})