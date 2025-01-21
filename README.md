Jira - https://mxrsel.atlassian.net/jira/software/projects/KAN/boards/1?assignee=unassigned%2C712020%3A4caa1853-95b5-4461-8d36-e3b959eac1d8


## Как работать с проектом

### Сразу после клонирования проекта (сделать только один раз после присоединения к проекту):
1. создать локальную ветку dev и установить для нее отслеживание удаленной ветки origin/dev
   
   `git checkout -b dev origin/dev`
2. разрешить автоматическую установку отслеживания для локальных веток
   
   `git config push.autosetupremote true`


### В дальнейшем перед началом работы над задачей my_new_feature:
1. переключиться на локальную ветку dev и обновить ее до состояния удаленной
   
   `git checkout dev
   git pull`
2. создать новую ветку для работы над задачей my_new_feature
   
   `git checkout -b my_new_feature`
3. отправить ветку задачи в репозиторий


### По завершении работы над задачей:
1. отправить ветку задачи в репозиторий
   
   `git push -u`
2. переключиться на локальную ветку dev и обновить ее до состояния удаленной
 
   `git checkout dev
   git pull`
3. объединить ветку задачи my_new_feature с веткой dev
 
   `git merge my_new_feature`
4. в случае отсутствия конфликтов отправить ветку dev в репозиторий
 
   `git push`
