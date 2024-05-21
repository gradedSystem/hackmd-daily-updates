/* 
  Adding the API key and note ID:
  - API Key: Obtain your API key from the HackMD website. Log in to your HackMD account, navigate to your profile or settings, and generate an API key.
  - Note ID: You can find your note ID in the URL of your HackMD note. For example, if your note URL is https://hackmd.io/123456789qwerty, the note ID is "123456789qwerty".

  Ensure you keep your API key secure and do not expose it in public repositories. 
  Store sensitive information securely using environment variables or a secrets manager.
*/

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ hackmdToken: '__YOUR__API_KEY__', noteId: '__YOUR__NOTE_ID__' }, function() {
    console.log('HackMD token and note ID set.');
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateNote') {
    // Ensure asynchronous handling
    const asyncResponse = (async () => {
      try {
        const { hackmdToken, noteId } = await new Promise((resolve, reject) => {
          chrome.storage.local.get(['hackmdToken', 'noteId'], (result) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve(result);
            }
          });
        });

        const { content } = request;

        if (!hackmdToken || !noteId) {
          sendResponse({ success: false, error: 'Token or Note ID missing' });
          return;
        }

        // Fetch the existing content of the note
        const response = await fetch(`https://api.hackmd.io/v1/notes/${noteId}`, {
          headers: {
            'Authorization': `Bearer ${hackmdToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch existing note content');
        }

        const existingNote = await response.json();
        const updatedContent = `${existingNote.content}\n\n${content}`;

        // Update the note with the combined content
        const updateResponse = await fetch(`https://api.hackmd.io/v1/notes/${noteId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${hackmdToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: updatedContent,
            readPermission: existingNote.readPermission,
            writePermission: existingNote.writePermission,
            permalink: existingNote.permalink
          })
        });

        if (updateResponse.status === 202) {
          sendResponse({ success: true });
        } else {
          throw new Error('Failed to update note');
        }
      } catch (error) {
        console.error('Error:', error);
        sendResponse({ success: false, error: error.message });
      }
    })();

    // Return true to indicate asynchronous response handling
    return true;
  }
});
