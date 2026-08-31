with open('src/components/FAQAccordion.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '{\n    question: "Is there a money-back guarantee?",\n    answer: "Yes. If you apply the protocols in the Playbook and do not see a measurable difference in your ability to close out tight matches within 30 days, we will refund you entirely."\n  }',
    '{\n    question: "Why will this work when everything else doesn\'t?",\n    answer: "Because we do not just train your forehand. Traditional coaching ignores the cognitive load of a high-pressure situation. Our T.R.U.S.T methodology targets the biological response—cortisol spikes and narrowed vision—that causes technique to break down. We rewire your nervous system to execute when the score is 30-30."\n  }'
)

with open('src/components/FAQAccordion.tsx', 'w') as f:
    f.write(content)
