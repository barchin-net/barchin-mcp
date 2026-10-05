#!/usr/bin/env python3
"""
Minimal example: call the Barchin MCP server from the OpenAI Responses API.

Get your API key at https://barchin.net/dashboard/api-keys and set it as
the BARCHIN_API_KEY environment variable before running this script.
"""

import os

from openai import OpenAI

client = OpenAI()

barchin_api_key = os.environ["BARCHIN_API_KEY"]

response = client.responses.create(
    model="gpt-4.1",
    tools=[
        {
            "type": "mcp",
            "server_label": "barchin",
            "server_url": "https://barchin.net/mcp",
            "headers": {
                "Authorization": f"Bearer {barchin_api_key}",
            },
            "require_approval": "never",
        }
    ],
    input="Use the barchin scrape_url tool to fetch https://barchin.net and "
    "summarize the page in two sentences.",
)

print(response.output_text)
