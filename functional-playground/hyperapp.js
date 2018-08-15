var i
var stack = []
var id = 0;

//transformer code
function h(tag, props) {
  let node
  let children = []

  for (i = arguments.length; i-- > 2; ) {
    stack.push(arguments[i])
  }

  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      for (i = node.length; i--; ) {
        stack.push(node[i])
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(typeof node === "number" ? (node = node + "") : node)
    }
  }

  return typeof tag === "string"
    ? {
        tag: tag,
        props: props || {},
        children: children,
        generatedId : id++
      }
    : tag(props, children)
}

//small library

function app(props){
	let appView = props.view;
	let appState = props.state;
	let appActions = createActions({}, props.actions)
  let firstRender = false;
  let node = h("p",{},"")
	if(appView){
     requestAnimationFrame(render)
	}

// this function is used to replace the old DOM with new DO
  function render() {
    let doc = patch(node,(node = appView(appState,appActions)))
    if(doc) {
		  var children = document.body.children;
			for(let i = 0; i <= children.length; i++){
					removeElement(document.body, children[i], children[i])
			}
    	document.body.appendChild(doc);
		}
  }

	// remove element
	function removeElement(parent, element, node) {
    function done() {
      parent.removeChild(removeChildren(element, node))
    }

    let cb = node.attributes && node.attributes.onremove
    if (cb) {
      cb(element, done)
    } else {
      done()
    }
}

	// remove children recursively
	function removeChildren(element, node) {
    let attributes = node.attributes
    if (attributes) {
      for (let i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i])
      }
    }
    return element
  }

	// The createActions function creates an array of functions one each for action
  function createActions(actions,withActions){
      Object.keys(withActions || {}).map(function(name){
           return actions[name] = function(data) {
                data = withActions[name];
                update(data)
           }
      })
    return actions
  }
  
	// The update function is used to update the state, merge the old state with new state and render the new state
  function update(withState) {
      withState = withState(appState)
      if(merge(appState,withState)){
           appState = merge(appState,withState)         
           render();
      }
  }
  
	// the merge function is used to merge the old state and new state
  function merge(target, source) {
    let result = {}
    for (let i in target) { result[i] = target[i] }
    for (let i in source) { result[i] = source[i] }
    return result
  }

	// The patch function creates HTML Elements
	function patch(node,newNode) {
		let element;
    if (typeof newNode === "string") {
      element = document.createTextNode(newNode)
    } else {
        element = document.createElement(newNode.tag);
        for (let i = 0; i < newNode.children.length; ) {
              element.appendChild(patch(node,newNode.children[i++]))
        }
        for (let i in newNode.props) {
           element[i] = newNode.props[i]
        }
        element.setAttribute("id",newNode.props.id != undefined ? newNode.props.id : newNode.generatedId);
    }
    return element;
	}
}


/** @jsx h */

function main() {
	
	app({ view: (state, actions) =>
	    <div>
	       <button onclick={actions.up}>Increase</button>
         <button onclick={actions.down}>Decrease</button>
         <button onclick={actions.changeText}>Change Text</button>
         <p>{state.count}</p>
         <p>{state.changeText}</p>
	    </div>,
	    state : {
	    	count : 5,
        changeText : "Date: " + new Date().toString()
	    },
	    actions: {
       down: state => ({ count: state.count - 1 }),
       up: state => ({ count: state.count + 1 }),
       changeText : state => ({changeText : "Date: " + new Date().toString()})
     }
	})
}

main()