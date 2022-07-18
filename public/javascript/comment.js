async function commentFormHandler(event) {
    event.preventDefault()

    const comment_text = document.getElementById('comment-post').value.trim();

    const user_id = sessionStorage.getItem('user_id')

    const forum_id = parseInt(window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]);

    const post_id = parseInt(document.getElementById("comment-id").value)

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text,
                user_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }    
}

document.getElementById('comment-form').addEventListener('click', commentFormHandler)