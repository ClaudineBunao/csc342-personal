# <img src="../images/MP5.svg" alt="" width="35" height="36" style="vertical-align: bottom"> Mini Project 5

## 1. An interesting challenge you encountered when implementing JTW algorithms. What was the issue, and how did you solve it?
I wasn't sure how to start when implementing a JTW algorithm from scratch so I attended Office Hours and the guidance and resources provided helped me understand what I was doing better.

## 2. What security risks/vulnerabilities/weaknesses, if any, are present in your implementation? How can they be exploited, and what are some ways to fix them? Are there any tradeoffs if you implement any of the fixes?
When logging in I didn't hide the password for testing purposes but in the real world this exposes the confidentiality of a password. To fix this I can change the type to password. A tradeoff would be knowing whether or not you type in your password right.