from unittest import TestCase
from importlib import import_module
send_trees = import_module("send-trees")


class MockSendTreesCommand(send_trees.SendTreesCommand):

    def _get_args(self):
        return type("MockArgs", (object,), {"dbname": "MOCK_DB_NAME",
                                            "since": "0",
                                            "until": "0"})

    def _subprocess_call(self, args):
        self.subprocess_call_args = args
        return 1

    def _get_conf(self):
        return None

    def _get_out_dir(self):
        return "/tmp/BHGENTREEES_MOCK_OUT_DIR"


class SendTreesTestCase(TestCase):

    def test_subprocess_args_should_not_be_passed_if_empty(self):
        # the export.js script has correct defaults for since / until - we should not pass those args if they are not passed to us
        command = MockSendTreesCommand()
        with self.assertRaises(SystemExit):
            command.main()
        self.assertEqual(command.subprocess_call_args, ['node', 'export/export.js', '--db_name', 'MOCK_DB_NAME', '--output', "/tmp/BHGENTREEES_MOCK_OUT_DIR"])
