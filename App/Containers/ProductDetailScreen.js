import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import { Text, Rating, Button, Divider } from 'react-native-elements'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import BackHeader from '../Components/BackHeader'
import { currency } from '../Lib/numberFormatter.js'
import Carousel from 'react-native-looped-carousel'

// Styles
import styles from './Styles/ProductDetailScreenStyle'

class ProductDetailScreen extends Component {
  constructor (props) {
    super(props)
    const { width } = Dimensions.get('window')
    this.state = {
      size: { width, height: 250 }
    }
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout
    this.setState({ size: { width: layout.width, height: 250 } })
  }

  generateImageSlider (product) {
    var images = []
    if (product.images.length === 0) {
      images.push({ id: 0, image_url: 'http://onestopclick.tk/storage/default.png' })
    } else {
      images = product.images
    }
    return images
  }

  renderProductImage (image) {
    const { size } = this.state
    return (
      <Image source={{ uri: image.image_url }} key={image.id} resizeMode='contain' style={[styles.carouselBackground, size]} />
    )
  }

  countRating (product) {
    var rating = 0
    var length = product.reviews.length
    if (length > 0) {
      product.reviews.forEach((item) => {
        rating += item.rating
      })
      rating = rating / length
    }

    return rating
  }

  render () {
    const { product } = this.props.navigation.state.params
    return (
      <View>
        <View style={styles.hasNavbar}>
          <BackHeader title={I18n.t('productDetail')} {...this.props} />
        </View>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
            <Carousel
              bullets
              bulletStyle={styles.bulletStyle}
              bulletsContainerStyle={styles.bulletsContainerStyle}
              style={this.state.size}>
              { this.generateImageSlider(product).map(this.renderProductImage.bind(this))}

            </Carousel>
            <View style={{padding: 5}}>
              <Text numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{ fontSize: 18 }}>{product.product_name}</Text>
              <Divider style={styles.dividerMargin} />
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text>Rp.{ currency(product.price) }</Text>
                </View>
                <TouchableOpacity onPress={() => alert('go to review page')}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Rating readOnly startingValue={this.countRating(product)} imageSize={14} />
                    <Text style={{ marginLeft: 5, fontSize: 12 }}>{product.reviews.length} Review(s)</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Divider style={styles.dividerMargin} />
              <Text>
                {product.description}
              </Text>
              <Divider style={styles.dividerMargin} />
              <Button
                icon={{ name: 'shopping-cart' }}
                backgroundColor='green'
                fontFamily='Lato'
                style={{ margin: 0, padding: 0 }}
                onPress={() => alert('add to cart')}
                title={I18n.t('addToCart')} />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen)
