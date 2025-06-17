import csv
import re
import datetime

results = [] 

with open("extract-insta-posts.csv", mode="r") as file:
    csv_data = csv.reader(file)
    now = datetime.date.today()

    next(csv_data)
    data_no = 0

    for row in csv_data:
        if len(row) >= 4:
            url = row[3]
            if "/p/" in url or "/reel/" in url:

                match = re.search(r'/(p|reel)/([^/]+)', url)
                if match:
                    post_id = match.group(2)
                    data_no +=1;
                    now -= datetime.timedelta(days=1)
                    results.append((post_id, data_no, str(now)))
                    print(post_id, data_no, str(now))
                    
    print(results)
    
# with open("instagram_posts.csv")
