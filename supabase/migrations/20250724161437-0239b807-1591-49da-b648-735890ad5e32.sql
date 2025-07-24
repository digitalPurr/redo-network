-- Fix existing Twitter URL data that doesn't match the constraint
UPDATE profiles 
SET twitter_url = 'https://' || twitter_url 
WHERE twitter_url IS NOT NULL 
AND twitter_url != '' 
AND NOT (twitter_url ~* '^https?://.*(twitter\.com|x\.com)/.*$')
AND twitter_url ~* '^(twitter\.com|x\.com)/.*$';

-- For URLs that are just domain names without protocol or path, prepend https://
UPDATE profiles 
SET twitter_url = 'https://' || twitter_url || '/dirt_noise'
WHERE twitter_url = 'x.com/dirt_noise';