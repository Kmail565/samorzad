'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from "@/app/styles/navbar.module.css";

export default function Navbar2() {
    return(
        <Navbar expand="lg" className="bg-body-tertiary" className={styles.navbar}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <button className={styles.tabs}><Nav.Link href="/">Strona główna</Nav.Link></button>
                <button className={styles.tabs}><Nav.Link href="/blog">Aktualności</Nav.Link></button>
                <button className={styles.tabs}><Nav.Link href="/sports">Sporty</Nav.Link></button>
                <button className={styles.tabs}><Nav.Link href="/events">Wydarzenia</Nav.Link></button>
                <button className={styles.tabs}><Nav.Link href="/about">About</Nav.Link></button>
                <button className={styles.tabs}><Nav.Link href="/login">Zaloguj się</Nav.Link></button>
            </Container>
        </Navbar>
    );
}