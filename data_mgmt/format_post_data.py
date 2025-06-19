import csv
import re
import datetime
import os

results = [] 

with open("D:\DOWNLOADS\extract-insta-posts.csv", mode="r") as file:
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
                    results.append((post_id, data_no, now))
                    # print(data_no, now)

fileData = []
prev_date = None

try:
    os.remove("D:\DOWNLOADS\extract-insta-posts.csv")
except FileNotFoundError:
    print("File D:\\DOWNLOADS\\extract-insta-posts.csv not found for deletion.")
except Exception as e:
    print(f"Error deleting file: {e}")

    
with open("../public/database.csv", mode='r') as file:
    
    csv_data = csv.reader(file)
    first_row = next(csv_data)
    prev_date_str = first_row[1]

    try:
        prev_date = datetime.datetime.strptime(prev_date_str, '%Y-%m-%d').date()
    except ValueError:
        try:
            prev_date = datetime.datetime.strptime(prev_date_str, '%m/%d/%Y').date()
        except ValueError:
            print(f"Could not parse date: {prev_date_str}")
            prev_date = datetime.date.today()

    # print(f"Previous date: {prev_date} (type: {type(prev_date)})")
    
    fileData.append(first_row)
    for row in csv_data:
        fileData.append(row)
        
   
    

with open("../public/database.csv", mode='w') as file:
    
    csv_writer = csv.writer(file)

    new_posts = []
    for post_id, data_no, date_str in results:
        if date_str > prev_date:
            new_posts.append([post_id, date_str])
    
    for post in new_posts:
        file.write(f"{post[0]},{post[1]}\n")

    for row in fileData:
        file.write(f"{row[0]},{row[1]}\n")

    print("completed")
    