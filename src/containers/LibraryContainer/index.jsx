import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import {
  getArticlesAction,
  addArticleAction,
  selectArticleAction,
  searchArticlesAction,
} from '../../actions/libraryActions'

import Library from '../../presentationals/Library'

import { newArticle } from '../../utils/article'

class LibraryContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    libraryState: ImmutablePropTypes.map.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(getArticlesAction([]))
  }

  onAddBtnClick = () => {
    const { dispatch } = this.props
    const article = newArticle()
    dispatch(addArticleAction(article))
    return dispatch(selectArticleAction(article.id))
  }

  onArticleSelect = articleID => this.props.dispatch(selectArticleAction(articleID))

  onSearch = text => this.props.dispatch(searchArticlesAction(text))

  render() {
    const { dispatch, libraryState, ...other } = this.props
    const isHidden = libraryState.get('isHidden')
    const articles = libraryState.get('articles')
    const currentArticle = libraryState.get('currentArticle')
    const searchText = libraryState.get('searchText')
    const searchArticles = libraryState.get('searchArticles')

    return (
      <Library
        {...other}
        isHidden={isHidden}
        articles={searchText ? searchArticles : articles}
        currentArticle={currentArticle}
        searchText={searchText}
        onAddBtnClick={this.onAddBtnClick}
        onArticleSelect={this.onArticleSelect}
        onSearch={this.onSearch}
      />
    )
  }
}

export default connect((state) => ({
  libraryState: state.get('libraryState'),
}))(LibraryContainer)