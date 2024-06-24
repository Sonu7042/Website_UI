import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct/>

      <HorizontalCardProduct  category={"airpodes"} heading={'Tops Airpodes'}/>
      <HorizontalCardProduct  category={"watches"} heading={'Tops Watches'}/>

      <VerticalCardProduct category={"mobiles"} heading={'Mobiles'}/>
      <VerticalCardProduct category={"Mouse"} heading={' Mouses'}/>
      <VerticalCardProduct category={"televisions"} heading={' Televisions'}/>
      <VerticalCardProduct category={"camera"} heading={' Camera & Photegraphy'}/>
      <VerticalCardProduct category={"speakers"} heading={' Speakers'}/>
      <VerticalCardProduct category={"earphones"} heading={' Wired Earphones'}/>
      <VerticalCardProduct category={"refrigerator"} heading={'Refrigerators'}/>
      <VerticalCardProduct category={"printers"} heading={'Printers'}/>
      <VerticalCardProduct category={"processor"} heading={'Processors'}/>
      <VerticalCardProduct category={"trimmers"} heading={'Trimmers'}/>
    </div>
  )
}

export default Home