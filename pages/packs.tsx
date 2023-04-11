import Layout from '@/components/layout';
import GridContainer from '@/components/grid_container';
import GridCell from '@/components/grid_cell';
import PackModal from '@/components/pack_modal';
import { useState } from 'react';
import PackData from '@/data/dummy';

export default function Main() {
   const [activeId, setActiveId] = useState(0);
   let showModal = false;
   (activeId > 0) ? showModal = true : showModal = false;

   return (
   <Layout>
      <h1 style = {{marginLeft: "7.2rem"}}>Booster Packs</h1>
      <GridContainer>
         <PackModal 
         title = {PackData(activeId).title}
         image = {PackData(activeId).image}
         isOpen = {showModal} 
         resetState = {() => setActiveId(0)} />
         <GridCell id = {1}
         title = {PackData(1).title}
         image = {PackData(1).image}
         quantity = {5}
         isActive = {activeId === 1} 
         setActive = {() => setActiveId(1)} />
         <GridCell id = {2}
         title = {PackData(2).title}
         image = {PackData(2).image}
         quantity = {3}
         isActive = {activeId === 2} 
         setActive = {() => setActiveId(2)} />
         <GridCell id = {3}
         title = {PackData(3).title}
         image = {PackData(3).image}
         quantity = {1}
         isActive = {activeId === 3} 
         setActive = {() => setActiveId(3)} />
         <GridCell id = {4}
         title = {PackData(4).title}
         image = {PackData(4).image}
         quantity = {2}
         isActive = {activeId === 4} 
         setActive = {() => setActiveId(4)} />
      </GridContainer>
      <br />
      active id: {activeId};
    </Layout>
   );
}