document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('standup-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form data
    const date = document.getElementById('date').value;
    const percentage = document.getElementById('percentage').value;
    const score = document.getElementById('score').value;
    const worked = document.getElementById('worked').value;
    const didNotWork = document.getElementById('didNotWork').value;
    const learnings = document.getElementById('learnings').value;
    const bigPlans = document.getElementById('bigPlans').value;
    const smallPlans = document.getElementById('smallPlans').value;

    // Assemble the content to update the note
    const content = `
## ${date}

${percentage}%
${score}/10

* Worked: ${worked}
* Did not work: ${didNotWork}
* Learnings: ${learnings}

### Plan

Big:
* [${bigPlans}]

Misc (small):
* [${smallPlans}]
`;

    // Send a message to the background script to update the note
    chrome.runtime.sendMessage({
      action: 'updateNote',
      content: content
    }, function (response) {
      if (response) {
        if (response.success) {
          console.log('Note updated successfully!');
          // Optionally, reset the form fields after successful submission
          form.reset();
        } else {
          console.error('Failed to update note:', response.error);
        }
      } else {
        console.error('No response from background script');
      }
    });
  });
});
