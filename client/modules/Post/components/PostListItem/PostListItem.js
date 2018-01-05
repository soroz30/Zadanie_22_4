import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThumbUp from 'react-material-icons/icons/action/thumb-up';
import ThumbDown from 'react-material-icons/icons/action/thumb-down';
// Import Style
import styles from './PostListItem.css';
import { editPostRequest } from '../../PostActions';

class PostListItem extends React.Component {
  handleUpVote = () => {
    const updatedPost = Object.assign({}, this.props.post, {
      upVotes: this.props.post.upVotes + 1,
    });
    this.props.editPostRequest(updatedPost);
  }

  handleDownVote = () => {
    const updatedPost = Object.assign({}, this.props.post, {
      downVotes: this.props.post.downVotes + 1,
    });
    this.props.editPostRequest(updatedPost);
  }

  render() {
    return (
      <div className={styles['single-post']}>
        <h3 className={styles['post-title']}>
          <Link to={`/posts/${this.props.post.slug}-${this.props.post.cuid}`} >
            {this.props.post.title}
          </Link>
        </h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
        <p className={styles['post-desc']}>{this.props.post.content}</p>
        <p className={styles['post-action']}>
          <a href="#" onClick={this.props.onDelete} className={styles.delete}>
            <FormattedMessage id="deletePost" />
          </a>
          <MuiThemeProvider>
            <a onClick={this.handleUpVote} className={styles.votes}>
              Upvotes: {this.props.post.upVotes}
              <ThumbUp />
            </a>
          </MuiThemeProvider>
          <MuiThemeProvider>
            <a onClick={this.handleDownVote} className={styles.votes}>
              Downvotes: {this.props.post.downVotes}
              <ThumbDown />
            </a>
          </MuiThemeProvider>
        </p>
        <hr className={styles.divider} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    editPostRequest: (post) => dispatch(editPostRequest(props.post.cuid, post)),
  };
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    upVotes: PropTypes.number.isRequired,
    downVotes: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  editPostRequest: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(PostListItem);
