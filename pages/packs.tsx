import Layout from '@/components/layout';
import GridContainer from '@/components/grid_container';
import GridCell from '@/components/grid_cell';
import PackModal from '@/components/pack_modal';
import { useState, useMemo } from 'react';
import { UserData, CardData, PackData } from '@/data/dummy';
import { useUserContext } from '@/user_context';
import styles from '@/styles/grid.module.css';
import PackWrapper from '@/lib/pack_context';

export default function Main() {
   const user: any = useUserContext();

   const [activeId, setActiveId] = useState(0);
   let showModal = false;
   (activeId > 0) ? showModal = true : showModal = false;
   
// replace object w/map ?
   function createCells() {
      const cellArr: any = [];
      let packs: any = Object.entries(user.packCollection);
   
      for (let i = 0; i < packs.length; i++) {
         let currentId: any = packs[i][1].id;
         let currentQuantity: any = packs[i][1].quantity;
   
         cellArr.push(<GridCell id = {currentId}
                  title = {PackData(currentId).title}
                  image = {PackData(currentId).image}
                  quantity = {currentQuantity}
                  isActive = {activeId === currentId}
                  setActive = {() => setActiveId(currentId)}
                  key = {i} />);
      }

      console.log("createCells() was called");
      return cellArr;
   }

   const cells: any = useMemo(createCells, []);

   return (
   <PackWrapper>
   <Layout>
      <h1 style = {{marginLeft: '7.2rem'}}>Booster Packs</h1>
      <br />
      <GridContainer>
         <PackModal 
         title = {PackData(activeId).title}
         image = {PackData(activeId).image}
         packId = {activeId}
         isOpen = {showModal} 
         resetState = {() => setActiveId(0)} />

         { cells }

      </GridContainer>
    </Layout>
    </PackWrapper>
   );
}