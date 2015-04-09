# Table of Contents
  1. [Markup](#markup)
  1. [Creating simpleowl](#creating-simpleowl)
  1. [Navigation](#navigation)
    1. [Next or previous slide](#next-or-previous-slide)
    1. [Dots](#dots)
  1. [Multiple carousel instances](#multiple-carousel-instances)
    1. [Target a single carousel instance](#target-a-single-carousel-instance)
  1. [Extra options](#extra-options)

## Markup
All slides are kept within a container with `.item` as a child, every element that doesn't have this class will not be slided. In addition this script will read out any grid to keep it responsive.

    <header data-carousel>
        <div class="item col-sm-12">
            <div class="container">
                <img src="../assets/img/flashgordon.png" class="pull-right">
                <div class="pull-left">
                    <h1>Flash Gordon is the hero of a science fiction</h1>
                    <p>First published January 7, 1934, the strip was inspired by and created to compete with the already established Buck Rogers adventure strip. Also inspired by these series were comics....</p>
                </div>
            </div>
        </div>
        ...
    </header>

## Creating simpleowl
In order to trigger simpleowl you need to specify `data-carousel` without a value on the container of your items.

    <div id="container" data-carousel>
        ...
    </div>

## Navigation
### Next or previous slide
You can specify your own element as a next or previous button, in order to do this you need to use `data-carousel-next` or `data-carousel-previous`

    <div data-carousel-next> Next </div>
    <div data-carousel-previous> Previous </div>

### Dots
You can also specify your own dots container. Which will be clickable. Simple add the following code:

    <div data-carousel-dots data-carousel-container="containerId"></div>

** Notice: `data-carousel-container` with a valid ID is required **


## Multiple carousel instances
### Target a single carousel instance
By default the navigation will be applied to all carousel instances created on a page, if you want to target a single carousel then you can apply `data-carousel-container`, the value of this attribute should be a valid HTML id that holds your item (see [Markup](#markup) for the items):

    <header id="slider" data-carousel>
        <div class="item col-sm-12">
            <div class="container">
                <img src="../assets/img/flashgordon.png" class="pull-right">
                <div class="pull-left">
                    <h1>Flash Gordon is the hero of a science fiction</h1>
                    <p>First published January 7, 1934, the strip was inspired by and created to compete with the already established Buck Rogers adventure strip. Also inspired by these series were comics....</p>
                </div>
            </div>
        </div>
        ...
    </header>
    <div class="next" data-carousel-next data-carousel-container="slider"></div>


## Extra options
### Center
Start the slides centered:
    ``data-carousel-center``

### Loop
Loop all slides:
    ``data-carousel-loop``

### Autoplay
Play a loop through slides, by default the value is 5000ms, you can specify the value by setting a number:
    ``data-carousel-autoplay="5000"``

### Autoplay pause on hover
Pause the play loop when an user is hovering an item:
    ``data-carousel-autoplay-pause-hover``

### Set the StartPosition
Define the start position to begin with:
    ``data-carousel-startposition="2"``

### Slide by
Define how many slides should be slided within one step:
    ``data-carousel-slideby="2"``

### Responsive Refresh Rate
By default this script will recalculate responsive items 100ms after a window resize has been triggered, to change this:
    ``data-carousel-refresh-rate="50"``
