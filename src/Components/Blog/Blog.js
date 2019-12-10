
import React, {Component} from 'react';
import Post from "../Post/Post";
import './Blog.css';
class Blog extends Component {
    lastDateTime = null;
    interval = null;
    url = "http://146.185.154.90:8000/messages";
    state = {
        posts: [],
        author: '',
        message: '',
    };
    componentDidMount() {
        this.interval = setInterval(() => {
            this.getMessages()
        }, 2000)
    }
    getPost = (e) => {
        e.preventDefault();
        const data = new URLSearchParams();
        data.set('message', this.state.message);
        data.set('author', this.state.author);
        fetch (this.url, {
            method: 'post',
            body: data,
        });


    };
    author = event => this.setState({author: event.target.value});
    message = event => this.setState({message: event.target.value});
    renderOnPage = ()=> {
        return this.state.posts.map((post, index) => (
            <Post key={index}  message={post.message} author={post.author}/>
        ))
    };

    getMessages = async (dateTime) => {
        if (dateTime === undefined) {
            this.url = 'http://146.185.154.90:8000/messages';
        } else {
            this.url = 'http://146.185.154.90:8000/messages?datetime=' + this.lastDateTime
        }
        const response = await fetch(this.url);
        if (response.ok) {
            const result = await response.json();
            if(result.length !== 0) {
                let posts = [...this.state.posts];
                this.lastDateTime = result[result.length - 1].datetime;
                this.setState({posts: posts.concat(result).reverse()});
            }
        }
    };

    componentDidUpdate() {
        clearInterval(this.interval);
        this.interval = setInterval(() =>  {
            this.getMessages(this.lastDateTime)
        },2000)
    }


    render() {
        return (
            <div className="Blog">
                <form action="" onSubmit={this.getPost}>
                    <input type="text" className="main-input" placeholder="Ваш Текст" onChange={this.message}/>
                    <input type="text" className="user-input" placeholder="Ваше Имя" onChange={this.author}/>
                    <button className="btn-1" type='submit'>Отправить</button>
                </form>
                {this.renderOnPage()}

            </div>
        );
    }
}

export default Blog;