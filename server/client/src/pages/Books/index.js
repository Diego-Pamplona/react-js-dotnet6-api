import React, {useState, useEffect} from 'react';
import {Link, useHistory } from "react-router-dom";
import {FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';


import './styles.css';
import logoimage from '../../assets/logo.svg'

export default function Books(){
    const [books, setBooks] = useState([]);
    const userName = localStorage.getItem('userName');
    const accessToken = localStorage.getItem('accessToken');

    const history = useHistory();

    useEffect(() => {
        api.get('api/Book/v1/asc/10/1', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            setBooks(response.data.list)
        })
    }, [accessToken]);

    async function logout(){
        try {
            await api.get('api/auth/v1/revoke', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            localStorage.clear();
            history.push('/');
        } catch (error) {
            alert('Logout failed ' + error )
        }
    }

    async function deleteBook(id){
        try {
            await api.delete(`api/Book/v1/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setBooks(books.filter(book => book.id !== id))
        } catch (error) {
            alert('Delete failed ' + error )
        }
    }

    return (
        <div className="book-container">
            <header>
                <img src={logoimage} alt="Erudio"/>
                <span>Welcome, <strong>{userName.toUpperCase()}</strong>!</span>
                <Link className="button" to="book/new">Add new Book</Link>
                <button type="button">
                    <FiPower onClick={logout} size={18} color="#251FC5" />
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                    <strong>Title:</strong>
                    <p>{book.title}</p>
                    <strong>Autor:</strong>
                    <p>{book.author}</p>
                    <strong>Price:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                    <strong>Release Date:</strong>
                    <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>
                    
                    <button type="button">
                        <FiEdit size={20} color="#251fc5"/>
                    </button>
                    <button onClick={() => deleteBook(book.id)} type="button">
                        <FiTrash2 size={20} color="#251fc5"/>
                    </button>
                </li>
                ))}
            </ul>


        </div>
    )
}