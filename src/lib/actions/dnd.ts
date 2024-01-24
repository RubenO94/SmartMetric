//Function to drag something
export function draggable(node: any, data: any) {
    let state = data

    node.draggable = true
    node.style.cursor = 'grab'

    function handleDragStart(e: any) {
        if (!e.dataTransfer) return
        e.dataTransfer.setData('text/plain', state)
    }

    node.addEventListener('dragstart', handleDragStart)

    return {
        update(data: any) { state = data },
        destroy() { node.removeEventListener('dragstart', handleDragStart) }
    }
}

//Function to drop something
// export function dropzone(node: any, options: any) {
//     let state = {
//         dropEffect: 'move',
//         dragover_class: 'droppable',
//         ...options
//     }

//     function handleDragEnter(e: any) {
//         e.target.classList.add(state.dragover_class)
//     }

//     function handleDrop(e: any) {
//         e.preventDefault()
//         const data = e.dataTransfer.getData('text/plain')
//         e.targer.classList.remove(state.dragover_class)
//         state.on_dropzone(data, e)
//     }

//     node.addEventListener('dragenter', handleDragEnter)
//     node.addEventListener('drop', handleDrop)

//     return {
//         update(options: any) {
//             state = {
//                 dropEffect: 'move',
//                 dragover_class: 'droppable',
//                 ...options
//             }
//         },
//         destroy() {
//             node.removeEventListener('dragenter', handleDragEnter)
//             node.removeEventListener('drop', handleDrop)
//         }
//     }
// }