import React, { Component } from "react";
import BooksService  from  '../services/BookServices.js';
import ReactTable from 'react-table';

import { Button, Modal } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import 'react-table/react-table.css';
import '../styles/booklist.css';

import Moment from 'react-moment';


const  booksServices  =  new  BooksService();

class BooksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [],
            showModal: false,
            id: 0,
            title: '',
            author: '',
            publication_date: '',
            edition: '',
            img_src: '',
            stock: ''
        };       
        this.bookSubmit = this.bookSubmit.bind(this); 
        this.openModal = this.openModal.bind(this);
        
    }
    

    componentDidMount() {
        var self  =  this;
        self.getBooks();
    }
    closeModal(){
        this.setState({
          showModal: false,
        });
    }
    
    openModal(event, id){
        if(id>0){
            booksServices.getBook(id).then((book)=>{
                this.state.id = book.id;
                this.refs.title.value  =  book.title;
                this.refs.author.value  =  book.author;
                this.refs.publication_date.value  =  book.publication_date;
                this.refs.edition.value  =  book.edition;
                this.refs.img_src.value  =  book.img_src;
                this.refs.stock.value  =  book.stock;
                console.log(this.state.id); 
            })        
        }
        else{
            this.state.id = id;
        }
        this.setState({
          showModal: true,
        });
    }  
    getBooks(){
        var self  =  this;
        booksServices.getBooks().then((data) => {
            self.setState({ books: data })             
        });
    }

    bookDelete(event,id){
        var  self  =  this;
        console.log(id);
        booksServices.deleteBook({id :  id}).then(()=>{
            var  newArr  =  self.state.books.filter(function(obj) {
                return  obj.id  !==  id;
            });    
            self.setState({books:  newArr})
        });
    }
    
    bookCreate(){
        booksServices.createBook(
            {
            "title":  this.refs.title.value,
            "author":  this.refs.author.value,
            "publication_date":  this.refs.publication_date.value,
            "edition":  this.refs.edition.value,
            "img_src":  this.refs.img_src.value,
            "stock":  this.refs.stock.value
            }).then((result)=>{
                    alert("Libro creado");
            }).catch(()=>{
                    alert('Ocurrio un errror, revise que que los datos ingresados sean los correctos');
            });
    }

    bookUpdate(id){
        booksServices.updateBook(
            {
            "id":  id,
            "title":  this.refs.title.value,
            "author":  this.refs.author.value,
            "publication_date":  this.refs.publication_date.value,
            "edition":  this.refs.edition.value,
            "img_src":  this.refs.img_src.value,
            "stock":  this.refs.stock.value
            }
            ).then((result)=>{        
                alert("Libro modificado");
            }).catch(()=>{
                alert('Ocurrio un errror, revise que que los datos ingresados sean los correctos');
            });
    }

    bookSubmit(event) {
        
        if(this.state.id > 0){
            this.bookUpdate(this.state.id);
        }
        else
        {
            this.bookCreate();
        }
        event.preventDefault();

        this.closeModal();
        this.getBooks();
    }
    

    render() {
        const columns = [
            {
                Header: 'Imagen',
                accessor: 'img_src',
                Cell: props => 
                <div style={{width: "60px"}}>
                    <img src={props.value} style={{maxHeight: "100px"}} alt="Logo" /> 
                </div>
            },{
                Header: 'Title',
                accessor: 'title',
                Cell: props => <div style={{textAlign:"center"}}>{props.value}</div>,
                filterable: true

            }, {
                Header: 'Author',
                accessor: 'author', 
                Cell: props => <div style={{textAlign:"center"}}>{props.value}</div>,
                filterable: true
            }, {
                Header: 'Publication date',
                accessor: 'publication_date', 
                Cell: props => 
                <div style={{textAlign:"center"}}>
                    <Moment format="YYYY/MM/DD">
                    {props.value}
                    </Moment>
                </div>
                
            }, {
                Header: 'Edition',
                accessor: 'edition',
                Cell: props => <div style={{textAlign:"center"}}>{props.value}</div>
            }, {
                Header: 'stock',
                accessor: 'stock',
                Cell: props => <div style={{textAlign:"center"}}>{props.value}</div>
            },{
                Header: 'Actions',
                accessor: 'id',
                Cell: props => 
                <div style={{textAlign:"center"}}>
                <button type="button" className="btn btn-info" onClick={(e)=>  this.openModal(e,props.value)}> Editar</button>                
                <button type="button" className="btn btn-danger" onClick={(e)=>  this.bookDelete(e,props.value) }> Eliminar</button>
                </div>
            }
        ]
        return (
        <div  className="col-md-10 offset-md-1">
            <div className="container-fluid">
                <section className="row">
                <div className="col-md-8">
                    <h1>Administrador</h1>
                    
                </div>
                <div className="col-md-4">
                    <div className="btn-group float-right mt-2" role="group">
                        <a className="btn btn-secondary btn-md" href="#" onClick={(e)=>  this.openModal(e,-1)}>
                            <FontAwesomeIcon icon={faPlus} className="icon-margins"/> 
                            Agregar Libro
                        </a>                                                         
                                        
                    </div>
                </div>
                </section>
            </div>            
                                   
            <ReactTable
            data={this.state.books}
            columns={columns}
            />            
            <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                <form onSubmit={this.bookSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar un Libro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                        <div className="form-group">
                            <label>Título:</label>
                            <input className="form-control" type="text" ref='title'  />

                            <label>Autor:</label>
                            <input className="form-control" type="text" ref='author' />

                            <label>Fecha de Publicacón:</label>
                            <input className="form-control" type="text" ref='publication_date' />

                            <label>Edición:</label>
                            <input className="form-control" type="text" ref='edition' />

                            <label>Numero de ejemplares:</label>
                            <input className="form-control" type="text" pattern="[0-9]*" ref='stock' />

                            <label>Imagen (via link):</label>
                            <input className="form-control" type="text" ref='img_src' />

                        </div>                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-primary" type="submit" value="Submit">OK</Button>
                        <Button onClick={this.closeModal.bind(this)} >Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
        
        );
    }
}
    
export default BooksComponent;