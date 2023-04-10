import Layout from '@/components/layout';
import GridContainer from '@/components/grid_container';
import GridCell from '@/components/grid_cell';
import styles from '@/styles/test.module.css';

export default function Main() {
   return (
   <Layout>
      <h1 style = {{marginLeft: "7.2rem"}}>Booster Packs</h1>
      <GridContainer>
         <GridCell title = "Colosseum" image = "/images/booster_art/Colosseum.png" quantity = {5} />
         <GridCell title = "Evolutions" image = "/images/booster_art/Evolution.png" quantity = {2} />
         <GridCell title = "Premier" image = "/images/booster_art/Premier.png" quantity = {4} />
         <GridCell title = "Mystery" image = "/images/booster_art/Mystery.png" quantity = {1} />
         <GridCell title = "Lost Isle" image = "/images/booster_art/Lost_Isle.png" quantity = {1} />
         <GridCell title = "Present" image = "/images/booster_art/Present.png" quantity = {1} />
         <GridCell title = "Flight" image = "/images/booster_art/Flight.png" quantity = {1} />
         <GridCell title = "Laboratory" image = "/images/booster_art/Laboratory.png" quantity = {1} />
         <GridCell title = "Legends" image = "/images/booster_art/Legends.png" quantity = {1} />
      </GridContainer>
    </Layout>
   );
}