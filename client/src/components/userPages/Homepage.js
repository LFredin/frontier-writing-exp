import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import {getAllBooksOfAUser} from '../../actions/bookActions';


class Homepage extends Component {

    state = {
        books : [],
    }
    

    renderAllUserBooks = ()=>{
        const userBooks = this.props.books.userBooks;
        
        console.log(this.props.books.userBooks);

        const style = {
            maxHeight: 'auto',
            maxWidth: '150px'
        }



         const displayingBooks = userBooks.map((book)=>
            <div className="col s12 m4 l3" key={book._id}>
                <div className="card-size card grey lighten-5">
                    <div className="card-image">
                        <img alt="Book" src="https://ccplwritersblock.files.wordpress.com/2019/09/shutterstock_1068141515.jpg"/>
                    </div>
                    <div className="card-content">
                        <span className="card-title"><Link className="title-link" to={`/selectedBook/${book._id}`}>{book.title}</Link></span>
                        <hr/>
                        <p className="c-text">{book.summary}</p>
                        <hr/>
                           
                        <div>
                            <div className="author-div">
                                <p className="c-text">{book.authors}</p>
                            </div>
                            <div className="lang-div">
                                <p className="c-text">{book.language}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        ); 

        const amountOfBooks = userBooks.length;

        return(
            <div className="row">
                <p>{amountOfBooks} Books:</p>
                {displayingBooks}
            </div>
        );
    }

    componentDidMount(){
        const {user} = this.props.auth;
        this.props.getAllBooksOfAUser(user.id)
    }

    componentDidUpdate(){
    }

    render(){
        const {user} = this.props.auth;

        return(
            <div className="container">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>Welcome {user.name}</h4>
                        
                        <section className="book-section">
                            {this.renderAllUserBooks()}
                        </section>

                        <hr/>
                        <div>
                            <button className="waves-effect waves-light btn">
                                <Link  style={{ color: '#FFF' }} to='/createBook'>Create a new book</Link>    
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

 Homepage.propTypes = {
    auth: PropTypes.object.isRequired
}  
 
const mapStateToProps = (state)=>({
    auth: state.auth,
    books: state.books 
});
 
export default connect(mapStateToProps, {getAllBooksOfAUser})(Homepage);