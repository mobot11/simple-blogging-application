import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'
import { createPost } from '../actions/index'
import { Link } from 'react-router'

class PostsNew extends Component {
	//router available to all components through context types
	//dont use frequently
	static contextTypes = {
		router: PropTypes.object
	}

	onSubmit(props) {
		this.props.createPost(props)
		.then( () => {
			//blog post has been created, navigate the user to the index
			this.context.router.push('/')
		})
	}
	render() {
		const { fields: { title, categories, content }, handleSubmit } = this.props

		return (
			<form  onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create a New Post</h3>

				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
					<input type="text" className="form-control" {...title} />
					<div className="text-help">
						{title.touched ? title.error : ''}
					</div>
				</div>

				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input type="text" className="form-control"  {...categories}/>
					<div className="text-help">
						{categories.touched ? categories.error : ''}
					</div>
				</div>

				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					{/*figure out what is going on here tomorrow*/}
					<label>Content</label>
					<textarea className="form-control" {...content}/>
					<div className="text-help">
						{content.touched ? content.error : ''}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

//if we want to mark form as invalid, add truthy value to errors object
function validate(values) {
	const errors = {}

	if (!values.title) {
		errors.title = 'Enter a username'
	}
	if (!values.categories) {
		errors.categories = 'Enter at least one category'
	}
	if (!values.content) {
		errors.content = 'Enter post content'
	}

	return errors
}



//connect: first arg = mapState second = mapDispatch

//reduxForm first = form config second = mapState third = mapDispatch

export default reduxForm({
	//configuration to redux form
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content'],
	validate,
}, null, { createPost })(PostsNew)
