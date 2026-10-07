# Speaking Exam Cue Cards

A full-screen cue-card display for the Listening & Speaking midterm speaking exam,
built with [Next.js](https://nextjs.org/).

## During the exam

- **Change topic** (shuffle button, left of the topic banner): shows a random new
  topic. Every topic is used once before any topic repeats, and the same topic is
  never shown twice in a row.
- **Timer** (right of the banner): press play to start the 3-minute countdown, and
  press again to pause. The time turns amber for the last 30 seconds and red for the
  last 10, then a soft chime plays (mute it with the speaker button in the top bar).
- **You should say** and **Useful words and expressions** start closed on every new
  topic. Open them if the student needs prompts.
- The full-screen button in the top bar fills a projector screen.

Keyboard shortcuts: `Space` start / pause, `N` or `→` change topic, `R` reset the
timer, `P` show / hide the prompts, `W` show / hide the useful words.

## Updating the cards

All exam content lives in [`app/questions/questions.json`](app/questions/questions.json):

```json
{
  "course": "Listening & Speaking 1",
  "exam": "Midterm Speaking Exam",
  "timeLimitSeconds": 180,
  "cards": [
    {
      "id": "A",
      "topic": "Meeting someone new",
      "task": "Describe the first time you met a person who is now a good friend.",
      "youShouldSay": ["where and when you met, and how you were introduced", "..."],
      "usefulWords": ["in person", "introduce", "..."]
    }
  ]
}
```

`id` only needs to be unique; it is not shown on screen.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```
