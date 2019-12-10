# React props

## Overview

We'll cover props in further detail and explore how they help us make our
components more dynamic and reusable. 


## Objectives

1. Explain how props make our components more dynamic and reusable
2. Pass props to a component by adding them as attributes when you render them
2. Declare default prop values in React
3. Render a component with props and default props


## What are props?

Props allow us to pass values into our components. These values can be anything:
strings, objects (including arrays and functions), and so on. They give us the
opportunity to make our components more dynamic, and a **lot more** reusable.

For example, say we have a `<MovieCard />` component. A movie has a title, a
poster image, and many other attributes (or **prop**-erties!). Let's examine what this `<MovieCard />` component would look like with _hardcoded_ data vs. dynamic _prop_ data:

###### Hardcoded:

```js
class MovieCard extends React.Component {
  render() {
    return (
      <div className="movie-card">
        <img src="http://image.tmdb.org/t/p/w342/kqjL17yufvn9OVLyXYpvtyrFfak.jpg" alt="Mad Max: Fury Road" />
        <h2>Mad Max: Fury Road</h2>
        <small>Genres: Action, Adventure, Science Fiction, Thriller</small>
      </div>
    )
  }
}
```


## Passing in props

Mad Max: Fury Road is a ridiculously good movie, but what if we want to render a
movie card for another movie? Do we just write another component? No, that would
be silly! Instead, we write our components so that they make use of props, which
are passed from their parents.

To pass props to a component, you add them as attributes when you render them:

```js
const movieTitle = "Mad Max"
<MovieCard title={movieTitle} />
```

The value of a prop is passed in through JSX curly braces. As we read before,
this value can be anything: a variable, inline values, functions, etc. If your
value is a hardcoded string, you can pass it in through double quotes instead:

```js
<MovieCard title="Mad Max" />
```

Armed with that knowledge, let's update `MovieCard`s render method to make use of props:

###### Dynamic with Props:

```js
// assuming we are rendering a MovieCard component with the following JSX:
const title = "Mad Max"
const posterURL = "http://image.tmdb.org/t/p/w342/kqjL17yufvn9OVLyXYpvtyrFfak.jpg"
const genresArr = ["Action", "Adventure", "Science Fiction", "Thriller"]

<MovieCard title={title} posterSrc={posterURL} genres={genresArr} />
```

```js
class MovieCard extends React.Component {
  render() {
    return (
      <div className="movie-card">
        <img src={this.props.posterSrc} alt={this.props.title} />
        <h2>{this.props.title}</h2>
        <small>{this.props.genres.join(', ')}</small>
      </div>
    )
  }
}
```

Now, does that not look cleaner and more reusable compared to our hard coded
example or what!?


## Default values for props

Let's switch gears here and imagine we are using our application to render a
list of hundreds of movies. Let's also assume the data set we have is not always
reliable when it comes to the urls of the movie posters. 

In this case, we want to make sure our component doesn't render as an utter
disaster when the data is incomplete. In order to do this, we can use a
**default prop** to assign a poster url when either a bad one, or none at all,
is provided. For this example, let's use the poster for Max Headroom as a
default, seeing as it is a perfect placeholder:

<p align="center">
  <img src="https://m.media-amazon.com/images/M/MV5BOTJjNzczMTUtNzc5MC00ODk0LWEwYjgtNzdiOTEyZmQxNzhmXkEyXkFqcGdeQXVyNzMzMjU5NDY@._V1_UY268_CR1,0,182,268_AL_.jpg" />
</P>

Instead of passing in that default poster image in case we don't have one, we
can tell our `MovieCard` component to use a default prop **if the `poster` prop
was not provided**. To do this, we add the `defaultProps` property to our
`MovieCard` class:

```js
class MovieCard extends React.Component {
  render() {
    return (
      <div className="movie-card">
        <img src={this.props.posterSrc} alt={this.props.title} />
        <h2>{this.props.title}</h2>
        <small>{this.props.genres.join(', ')}</small>
      </div>
    )
  }
}

MovieCard.defaultProps = {
  posterSrc: 'http://i.imgur.com/bJw8ndW.png'
}
```

Now, whenever we omit the `posterSrc` prop, or if it's undefined, the
`MovieCard` component will use this default prop instead. That means we don't
have to worry about not passing in a poster all the time — the component will
take care of this for us!


## Why Use Default Props

An alternative way we could have handled bad urls would be to have `MovieCard`'s
parent component _check_ whether the `posterSrc` was valid/present, and then
pass some control value as a prop when it renders `MovieCard`. This is not ideal
compared to using a default prop within the `MovieCard` component. 

Consider the following: in React, we want components to encapsulate the
functionality that they _can and should be responsible for_. Should the parent
component of `MovieCard` be responsible for managing the assignment of a default
movie poster source value? In our example, we think not. It makes more sense for
the component that is responsible for rendering the movie information and poster
to handle missing data.

## Resources
- [React Default Prop Values](https://reactjs.org/docs/components-and-props.html#default-prop-values)

<p class='util--hide'>View <a href='https://learn.co/lessons/react-props-readme'>Props</a> on Learn.co and start learning to code for free.</p>
