import styles from '@/styles/packs.module.css';

export default function ApiCard({image}) {
return (
    <img className = {styles.bgCard} src = {image} />
);
}