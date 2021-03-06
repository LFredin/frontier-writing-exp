import React, {Component} from 'react';
import {connect} from 'react-redux';

import {createBook} from '../../actions/bookActions';
import LanguageSelector from 'components/shared-layout/LanguageSelector';


class CreateBook extends Component {
    
    state = {
        addChapter : false,
        title: '',
        author: '', //or authors??
        chapters: [],
        chapter: '',
        summary: '',
        language: '',
        creator: ''
    }

    //CREATE BOOK:
    handleCreateBook = (e)=>{
        e.preventDefault();

        const newBook = {
            title: this.state.title,
            authors: this.state.author,
            chapters: this.state.chapters,
            summary: this.state.summary, 
            language: this.state.language,
            creator: this.state.creator
        }
        this.props.createBook(newBook);
        //show user page only if book saving was success
        this.props.history.push('/homepage');
    }

    onClickAddChapter = (e)=>{
        e.preventDefault();
        this.setState({
            addChapter: true
        });
    }

    addChapterToState = (e)=>{
        e.preventDefault();

        if(this.state.chapter !== ""){
            this.setState(
                (prevState)=> ({
                    chapters: [...prevState.chapters, this.state.chapter]
            }));

            this.setState({
                chapter: ''
            });
        }

       

        const chapterInp = document.getElementById('chapter');
        chapterInp.value = "";
    }

    addChapter = ()=>{
        if(this.state.addChapter === true){
            return(
                <div>
                    <label>Name of chapter: </label>
                    <input id="chapter" onChange={(e)=>{this.setState({chapter: e.target.value})}} type="text"/>
                    <button onClick={this.addChapterToState} className="waves-effect waves-light btn-small common-button" >Add</button> 
                </div>
            );
        }else {
           return(
            <button onClick={this.onClickAddChapter} className="waves-effect waves-light btn-small common-button">Add Chapter</button> /* should set add chapter to true */
           );
        }
    }
    
    

    handleSummary = (e)=>{
        this.setState({
            summary: e.target.value //w.e is in the textarea at the moment
        });
    }


    handleLangChange(e) {
        this.setState({language: e.target.value});
    }

    setLanguage = (language)=>{
        this.setState({
            language:language
        });
    }

    componentDidMount(){
        this.setState({
            author: this.props.auth.user.name,
            creator: this.props.auth.user.id //Add to backend search
        });
    }

    componentDidUpdate(){
    }

    render(){

        const chapters = this.state.chapters.map((chapter, key)=>
            <p key={chapter}>{chapter}</p>
        );

        return(
            
            <div className="cb-container">
                <div className="center-align">
                    <h5>Create a new book</h5>
                    <p>All fields can be edited later</p>
                </div>

                <form className="col s12">
                    <div className="row">
                        <label htmlFor="title">Title: </label>
                        <input id="title" onChange={(e)=>this.setState({title: e.target.value})} type="text"/>
                    </div>
                   

                    <div className="row">
                        <label htmlFor="author">Author name: </label> 
                        <input id="title" value={this.state.author} onChange={(e)=>this.setState({author: e.target.value})} type="text"/>
                    </div>
                  

                    <div className="row">
                        <label htmlFor="summary">Summary: </label>
                        <textarea id="summary" onChange={this.handleSummary}/>   
                    </div>
                        
                    
                    <div className="row">
                        <label>Chapters: </label>
                        {chapters}
                        <br/>
                        {this.addChapter()}
                    </div>
                   

                     <div className="row">
                        <label>What language is the book written in?</label>
                        <LanguageSelector setLanguage={this.setLanguage} />
                    </div>
                    
                    <div className="row center">
                        <button disabled={!this.state.author || !this.state.title || !this.state.language} className="waves-effect waves-light btn common-button" onClick={this.handleCreateBook}>Create book</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state)=>({//may not need since we dont care abt the state anyway
    //books: state.books //to reach the book state via this.props.books instead
    //we wont need it tho i think, so maybe mstp can be null and we only use the 2nd param of conenct for maptodispatch
    auth: state.auth
});

export default connect(mapStateToProps, {createBook})(CreateBook);

//since this component doesnt care if anything is updated in the store (ithink) we can have mstp as null
//we can have the mapdispatchtoprops but we dont need to, it just looks nicer in code
/* since you can write props.createbook(stuff) instead of props.dispatch(createbook(stuff)) */