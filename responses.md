# Responses 

## Response 1

Hi,

I'm sorry to hear about the error.

I wasn't able to pinpoint the specifics from looking at your code.  Did you see an accompanying Plaid error code? The 402 error usually maps to a 1200 or 1300 Plaid error code, many of which are related to mistakes in account information. Once you get that error code, there are instructions on [this page](https://support.plaid.com/customer/en/portal/topics/973215-error-code-resolution/articles) to resolve them, which you might helpful.

If you're still experiencing difficulties, could you please paste the entire error message in your reply? That would help me to diagnose the issue. 

Thanks for your patience.

Mei

## Response 2

Hi,

Are you looking to authorize a new user? 

If so, it looks like your code might be a little different from what we are expecting.

This is a sample code snippet of what we are expecting. More details are available [on this page](https://plaid.com/docs/api/#add-auth-user)

    curl -X POST https://tartan.plaid.com/auth \
      -d client_id=test_id \
      -d secret=test_secret \
      -d username=plaid_test \
      -d password=plaid_good \
      -d type=wells
  
If you have the specific code 1000 error (there is a range from 1001 - 1009), [this page](https://support.plaid.com/customer/en/portal/articles/2537620-1000-errors) might be helpful in pinpointing the error. 

If I missed something and you're still experiencing difficulties, could you reply with the full error code you received and the specific code 1000 error? 

Thanks for your patience.

Best,
Mei



