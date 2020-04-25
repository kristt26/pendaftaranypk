<?php defined('BASEPATH') or exit('No direct script access allowed');

use Restserver\Libraries\REST_Controller;

require APPPATH . '/libraries/REST_Controller.php';

class CalonSiswa extends \Restserver\Libraries\REST_Controller
{
    public function __construct($config = 'rest')
    {
        parent::__construct($config);
        $this->load->model('CalonSiswa_model');
    }

    public function GetSiswa_get()
    {
        $output = $this->CalonSiswa_model->select(isset($_GET) ? $_GET['idcalonsiswa'] : false);
        $this->response($output, REST_Controller::HTTP_OK);

    }
    public function simpan_post()
    {
        $POST = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $Output = $this->CalonSiswa_model->insert($POST);
        if ($Output) {
            $this->response($Output, REST_Controller::HTTP_OK);
        } else {
            $this->response(false, REST_Controller::HTTP_BAD_REQUEST);
        }
    }
    public function ubah_put()
    {
        $this->load->library('Authorization_Token');
        $is_valid_token = $this->authorization_token->validateToken();
        if ($is_valid_token['status'] === true) {
            $POST = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
            $Output = $this->CalonSiswa_model->update($POST);
            if ($Output) {
                $this->response(true, REST_Controller::HTTP_OK);
            } else {
                $this->response(false, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }
    public function Hapus_delete()
    {
        $this->load->library('Authorization_Token');
        $is_valid_token = $this->authorization_token->validateToken();
        if ($is_valid_token['status'] === true) {
            $Output = $this->CalonSiswa_model->delete($this->uri->segment(3));
            if ($Output) {
                $this->response(true, REST_Controller::HTTP_OK);
            } else {
                $this->response(false, REST_Controller::HTTP_BAD_REQUEST);
            }
        }
    }
}
