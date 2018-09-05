cd .\dist
git add .
git commit -m "Build"
git push origin master -f
Invoke-WebRequest "http://52.66.167.224:3020/crm"